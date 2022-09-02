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

describe("POST /users", () => {
  test("it returns new user", async () => {
    const server = await getServer();

    const email = "jack@example.com";
    const password = "1234";
    const username = "jack";

    const expectedCreateUser = expect.objectContaining({
      email,
      username,
    });

    const response = await server
      .post("/users")
      .send({ email, password, username });

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expectedCreateUser);
  });
});
