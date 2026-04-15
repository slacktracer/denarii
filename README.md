# denarii

A personal finance API for tracking accounts, operations (income/expenses), and transfers between accounts.

## Overview

The application is structured in layers:

- **httpi** — Express HTTP API with session-based authentication (Redis-backed). Exposes REST endpoints for accounts, operations, transfers, categories, groups, tags, users, balances, and authentication.
- **domain** — Business logic shared by both interfaces.
- **persistence** — Data access layer using Prisma with PostgreSQL.

All endpoints (except authentication and user creation) require an active session. Both interfaces share the same domain and persistence layers.

## Tech stack

- [Node.js](https://nodejs.org/) + [TypeScript](https://www.typescriptlang.org/) (ES modules)
- [Express](https://expressjs.com/) with [express-session](https://github.com/expressjs/session)
- [PostgreSQL](https://www.postgresql.org/) (via [Prisma](https://www.prisma.io/))
- [Redis](https://redis.io/) (session store)

## Prerequisites

- Node.js (managed via nvm)
- PostgreSQL
- Redis
- Docker (for running tests — PostgreSQL and Redis run in containers)

## Setup

1. Install dependencies from the root:

```sh
npm install
```

This installs dependencies for `./`, `./main/` and `./tests/`.

2. Copy the example env file and fill in your values:

```sh
cp main/.env.example main/.env
```

You will need to set the PostgreSQL connection details (`PGHOST`, `PGUSER`, `PGDATABASE`, `PGPASSWORD`, `PGPORT`), a `REDIS_CONNECTION_STRING`, and a `SESSION_SECRET`.

3. Apply database migrations:

```sh
npm run apply-migrations
```

## Local development

Run the server locally. It connects to the remote PostgreSQL and Redis on Render (configured in `main/.env`).

Your current public IP must be in the inbound allowlist of both the Render Postgres and Redis instances. Add or refresh it in each provider's dashboard when you see `Client IP address is not in the allowlist.` (Redis) or a connection refusal (Postgres).

```sh
npm start
```

This runs nodemon, which watches for `.ts` and `.json` changes, recompiles, and restarts the server on port 2099 with the Node.js debugger enabled (`--inspect`).

Point the frontend at `http://localhost:2099` (see [capim's README](https://github.com/slacktracer/capim/blob/main/README.md)). Note: the `secret` cookie isn't set over HTTP, but `connect.sid` session auth still works.

## Running

Start the development server (with nodemon):

```sh
npm start
```

Or compile and execute the built version:

```sh
npm run build
npm run execute
```

The server listens on the port defined in `PORT` (default 2099). A health check is available at the `HEALTH_CHECK_ENDPOINT` path (default `/healthz`).

## Running tests

The test suite runs integration tests against real PostgreSQL and Redis instances in Docker containers.

From the root:

```sh
npm test
```

This compiles the main project and then runs the tests. Under the hood, the test runner:

1. Copies the Prisma schema into the test directory
2. Starts PostgreSQL and Redis containers via Docker Compose (ports 6543 and 6380)
3. Runs Prisma migrations against the database
4. Runs the integration tests with Vitest
5. Stops the container and cleans up

The tests cover all resource endpoints (accounts, operations, transfers, categories, groups, tags, users, balances).

## Build

```sh
npm run build
```

This copies source and Prisma files into `build/`, installs production dependencies, compiles TypeScript, and removes the `.ts` source files.

## Deploy

```sh
npm run deploy
```

This bumps the prerelease version (e.g. `v1.0.0-build.6`) across all three `package.json` files (root, `main/`, and `tests/`), commits it, and pushes the tag. The tag triggers a CircleCI pipeline that lints, runs integration tests, and if everything passes, deploys to Render via a webhook. No local build step is needed.

## Test data

### Generation

UUIDs are generated deterministically using `@faker-js/faker` seeded with a fixed value, so every run produces identical IDs. Each entity type has a `make-*-data.js` factory file under `tests/data/` that creates frozen objects with hardcoded values and fixed UUIDs. Factories are chained by dependency — account data receives user IDs, operation data receives account and category IDs, and so on.

Each collection is wrapped by `makeEnhancedArray()` into a frozen array with lookup properties:

- `byBindingName` / `$` (alias) — access by variable name (e.g. `users.$.user01`)
- `byID` — access by primary key

### Orchestration

`tests/data/data.js` is the central hub. It calls all the factory functions in dependency order, wires IDs between them, and generates raw SQL INSERT statements (via `squel`) for seeding. It exports both the data collections and `mockDataAsInsertStatements`.

### Test lifecycle

1. `test.sh` starts PostgreSQL and Redis containers (ports 6543 and 6380) and runs Prisma migrations
2. Before each test, `setup.js` clears all rows in foreign-key order via a Prisma transaction, then re-inserts everything using the raw SQL statements
4. Vitest runs single-threaded (`threads: false`) to avoid race conditions on the shared database

### Usage in tests

Tests import data collections from `data.js` and destructure what they need:

```js
const { account01 } = accounts.$;
const { user01 } = users.$;
```

Common patterns:

- **Authentication**: tests get session cookies using `userPasswords.$` credentials
- **Access control**: user01's tests try to access user02's resources to verify rejection
- **Assertions**: tests reconstruct expected responses using the fixture data and compare
- **Soft deletes**: `operation16` has `deleted: true` for testing delete filtering

### Current data shape (2026-04-03)

3 users, 6 accounts, 3 groups, 6 categories, 16 operations, 6 transfers, 5 tag keys, 6 tag values. Data is split across users for access control testing.

## Scripts reference

### Root

| Script | Purpose |
|--------|---------|
| `install` | Installs dependencies for both `main/` and `tests/` |
| `start` | Starts the dev server via nodemon |
| `build` | Builds the production bundle into `build/` |
| `execute` / `x` | Runs the built production bundle |
| `test` | Compiles main and runs the integration test suite |
| `lint` | Runs ESLint with auto-fix on both main and tests |
| `lint-staged` | Runs linters on staged files only. Called by the husky pre-commit hook |
| `prepare` | Sets up husky git hooks. Runs automatically after `npm install` |
| `clear` | Removes all `node_modules` and verifies npm cache |
| `deploy` | Bumps the prerelease version and pushes the tag to trigger CI |
| `version` | Lifecycle hook: propagates the bumped version to `main/` and `tests/` package.json files |
| `apply-migrations` | Applies Prisma migrations against the built schema |
| `d` | Shortcut to clean compiled JS from main |

### Main (`main/`)

| Script | Purpose |
|--------|---------|
| `compile` / `c` | Compiles TypeScript to JavaScript |
| `compile-on-ci` | Same `tsc` command as `compile`, but skips the `postcompile` SQL-formatting hook. Used in CI where formatting isn't needed |
| `check-types` | Type-checks without emitting JS files. Useful for quick validation |
| `decompile` / `d` | Removes all compiled `.js` and `.js.map` files |
| `execute` / `x` | Runs the server with the Node.js debugger enabled (`--inspect`) |
| `start` | Starts nodemon for development |
| `format` | Formats all files with Prettier |
| `lint` | Lints and auto-fixes with ESLint |
| `lint-staged` | Linters on staged files only (pre-commit) |
| `postcompile` | Runs automatically after `compile`. Formats `.sql` query files (uppercases SQL keywords, applies consistent formatting while preserving template variables) |

### Tests (`tests/`)

| Script | Purpose |
|--------|---------|
| `test` | Starts PostgreSQL and Redis Docker containers, runs migrations, runs the integration tests with Vitest, then stops the containers |
| `test-once-on-ci` | Same as `test` but skips Docker setup (CI already provides PostgreSQL and Redis as services) |
| `start` | Watches for changes and re-runs tests automatically via nodemon |
| `show-data` | Prints all test fixture data as readable tables and saves to `test-data.txt` |
| `save-test-output` | Same as `test` but captures verbose test output to `test-output.txt` |
| `format` | Formats all test files with Prettier |
| `lint` | Lints and auto-fixes test files |
| `lint-staged` | Linters on staged files only (pre-commit) |
