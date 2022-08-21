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
  await endConnections({ db, legacyRedisClient, redisServer });
});

beforeAll(async () => {
  backup = await prepareTestDatabase();
});

beforeEach(async () => {
  backup.restore();
});

describe("POST /users", () => {
  test("it returns new user", async () => {
    const { expressApplication } = await import("denarii/src/httpi/httpi.js");

    const email = "jack@example.com";
    const password = "1234";
    const username = "jack";

    const expectedCreateUser = expect.objectContaining({
      email,
      username,
    });

    const response = await request(expressApplication)
      .post("/users")
      .send({ email, password, username });

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expectedCreateUser);
  });
});
