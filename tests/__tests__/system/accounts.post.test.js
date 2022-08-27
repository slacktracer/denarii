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
import { getSessionIDCookie } from "../../functions/get-session-id-cookie.js";
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

describe("/POST accounts", () => {
  test("a new account is created and returned", async () => {
    // given
    const server = await getServer();

    const initialAmount = 0;
    const name = "New Account!";

    const expectedAccount = expect.objectContaining({ initialAmount, name });

    const sessionIDCookie = await getSessionIDCookie({
      password: "1234",
      server,
      username: "mr.user",
    });

    // when
    const response = await server
      .post("/accounts")
      .send({ initialAmount, name })
      .set("cookie", sessionIDCookie);

    // then
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expectedAccount);
  });
});
