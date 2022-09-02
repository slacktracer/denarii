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
import * as mockConnect from "../../mocks/persistence/connect.js";

jest.unstable_mockModule(
  `../../../main/src/persistence/connect.js`,
  () => mockConnect,
);

const { prepareTestDatabase } = await import(
  "../../functions/prepare-test-database.js"
);

const { db, legacyRedisClient, redisServer } = await import(
  `denarii/src/persistence/persistence.js`
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
