import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

import request from "supertest";

import { endConnections } from "../../functions/end-connections.js";

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
  await endConnections({ db });
  await legacyRedisClient.disconnect();
  await redisServer.stop();
});

beforeAll(async () => {
  backup = await prepareTestDatabase();
});

beforeEach(async () => {
  backup.restore();
});

describe("GET /healthz", () => {
  test("health is ok", async () => {
    const { expressApplication } = await import("denarii/src/httpi/httpi.js");

    const response = await request(expressApplication)
      .get("/healthz")
      .set("accept", "application/json");

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({ healthy: true });
  });
});
