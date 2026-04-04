# denarii

A personal finance API for tracking accounts, operations (income/expenses), and transfers between accounts. It calculates balances based on account initial amounts, operations, and transfers.

## Overview

The application is structured in layers:

- **httpi** — Express HTTP API with session-based authentication (Redis-backed). Exposes REST endpoints for accounts, operations, transfers, categories, groups, tags, users, balances, and authentication.
- **domain** — Business logic shared by both interfaces.
- **persistence** — Data access layer using Prisma with PostgreSQL.

All endpoints (except authentication and user creation) require an active session. Both interfaces share the same domain and persistence layers.

## Tech stack

- Node.js + TypeScript (ES modules)
- Express with express-session
- PostgreSQL (via Prisma)
- Redis (session store)

## Prerequisites

- Node.js (managed via nvm)
- PostgreSQL
- Redis
- Docker (for running tests)

## Setup

1. Install dependencies from the root:

```sh
npm install
```

This installs dependencies for both `main/` and `tests/`.

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

There are two ways to develop locally, depending on whether you need to run the denarii server itself.

### Frontend only (against the remote server)

The most common workflow. The frontend (capim) runs locally on HTTPS and a local proxy forwards API requests to the remote denarii instance on Render. No local denarii server needed.

1. **Add `capim.local` to your hosts file.** The local domain is needed so authentication cookies (which use `secure: true` and `sameSite: "None"`) work correctly across the frontend and API.

```
# /etc/hosts
127.0.0.1 capim.local
```

2. **Generate local HTTPS certificates with mkcert.** Secure cookies require HTTPS, even in development.

```sh
mkcert -install           # install the local CA (once)
mkcert capim.local        # generates capim.local.pem and capim.local-key.pem
```

Place the generated files in the capim project root.

3. **Start the frontend and proxy** from the capim project:

```sh
npm run x
```

This starts both the Nuxt HTTPS dev server on `https://capim.local:3000` and the reverse proxy on `https://capim.local:2099` (which forwards to `denarii.onrender.com`). The proxy rewrites CORS headers so credentials work properly.

### Backend development (local denarii server)

When working on denarii itself, run the server locally. It connects to the remote PostgreSQL and Redis on Render (configured in `main/.env`).

```sh
npm start
```

This runs nodemon, which watches for `.ts` and `.json` changes, recompiles, and restarts the server on port 2099 with the Node.js debugger enabled (`--inspect`).

Set the frontend's `NUXT_PUBLIC_BASE_URL` to `http://localhost:2099` to point it at the local server. Note that the `secret` cookie will not be set in this mode (it requires HTTPS), but session authentication via the `connect.sid` cookie still works over plain HTTP.

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

The test suite runs integration tests against a real PostgreSQL database in a Docker container.

From the root:

```sh
npm test
```

This compiles the main project and then runs the tests. Under the hood, the test runner:

1. Copies the Prisma schema into the test directory
2. Starts a PostgreSQL container via Docker Compose (exposed on port 6543)
3. Runs Prisma migrations against it
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

This bumps the prerelease version (e.g. `v1.0.0-build.6`), commits it, and pushes the tag. The tag triggers a CircleCI pipeline that lints, runs integration tests, and if everything passes, deploys to Render via a webhook. No local build step is needed.

## Test data

### Generation

UUIDs are generated deterministically using `@faker-js/faker` seeded with a fixed value, so every run produces identical IDs. Each entity type has a `make-*-data.js` factory file under `tests/data/` that creates frozen objects with hardcoded values and fixed UUIDs. Factories are chained by dependency — account data receives user IDs, operation data receives account and category IDs, and so on.

Each collection is wrapped by `makeEnhancedArray()` into a frozen array with lookup properties:

- `byBindingName` / `$` (alias) — access by variable name (e.g. `users.$.user01`)
- `byID` — access by primary key

### Orchestration

`tests/data/data.js` is the central hub. It calls all the factory functions in dependency order, wires IDs between them, and generates raw SQL INSERT statements (via `squel`) for seeding. It exports both the data collections and `mockDataAsInsertStatements`.

### Test lifecycle

1. `test.sh` starts a PostgreSQL 14 container on port 6543 and runs Prisma migrations
2. Before each test, `setup.js` clears all rows in foreign-key order via a Prisma transaction, then re-inserts everything using the raw SQL statements
3. Redis uses an in-memory server (redis-memory-server), no Docker needed
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
