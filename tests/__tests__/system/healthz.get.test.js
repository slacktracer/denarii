import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

import { endConnections } from "../../functions/end-connections.js";
import { getServer } from "../../functions/get-server.js";
import * as mockPersistence from "../../mocks/persistence.js";

jest.unstable_mockModule(
  `../../../main/src/persistence/persistence.js`,
  () => mockPersistence,
);

const { prepareTestDatabase } = await import(
  "../../functions/prepare-test-database.js"
);

const { db, redisServer } = await import(
  `../../../main/src/persistence/persistence.js`
);

const { legacyRedisClient } = await import(
  "../../../main/src/httpi/session-store.js"
);

let backup;

afterAll(async () => {
  await endConnections({ db, legacyRedisClient, redisServer });
});

beforeAll(async () => {
  backup = await prepareTestDatabase();
});

beforeEach(async () => {
  backup.restore();
});

describe("GET /healthz", () => {
  test("health is ok", async () => {
    const server = await getServer();

    const response = await server.get("/healthz");

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({ healthy: true });
  });
});
