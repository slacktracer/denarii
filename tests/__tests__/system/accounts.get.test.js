import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

import {
  account01,
  accountID01,
  accountID06,
  accounts,
  userID01,
} from "../../data/data.js";
import { endConnections } from "../../functions/end-connections.js";
import { getServer } from "../../functions/get-server.js";
import { getSessionIDCookie } from "../../functions/get-session-id-cookie.js";
import * as mockConnect from "../../mocks/persistence/connect.js";

jest.unstable_mockModule(
  `../../../main/src/persistence/connect.js`,
  () => mockConnect,
);

const { prepareTestDatabase } = await import(
  "../../functions/prepare-test-database.js"
);

const { db, redisServer } = await import(`denarii/src/persistence/connect.js`);

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

    const expectedAccounts = accounts
      .filter((account) => account.userID === userID01)
      .map((account) => {
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

  describe("an account ID was given", () => {
    test("it returns just the account with the given ID", async () => {
      // given
      const server = await getServer();

      const expectedAccount = expect.objectContaining(account01);

      const sessionIDCookie = await getSessionIDCookie({
        password: "1234",
        server,
        username: "mr.user",
      });

      // when
      const response = await server
        .get(`/accounts/${accountID01}`)
        .set("cookie", sessionIDCookie);

      // then
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(expectedAccount);
    });

    describe("the given account does not belong to the session user", () => {
      test("it returns null", async () => {
        // given
        const server = await getServer();

        const expectedAccount = null;

        const sessionIDCookie = await getSessionIDCookie({
          password: "1234",
          server,
          username: "mr.user",
        });

        // when
        const response = await server
          .get(`/accounts/${accountID06}`)
          .set("cookie", sessionIDCookie);

        // then
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(expectedAccount);
      });
    });
  });
});
