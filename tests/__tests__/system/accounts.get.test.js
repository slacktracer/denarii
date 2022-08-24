import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

import { accounts } from "../../data/data.js";
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

describe("GET /accounts", () => {
  test("it returns all the given user accounts", async () => {
    // given
    const server = await getServer();

    const expectedAccounts = accounts.map((account) => {
      account.updatedAt = null;

      return account;
    });

    const sessionIDCookie = await getSessionIDCookie({
      password: "1234",
      server,
      username: "mr.user",
    });

    // when
    const response = await server
      .get("/accounts")
      .set("cookie", sessionIDCookie);

    // then
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expectedAccounts);
  });
});
