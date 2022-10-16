import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

import { accounts, userPasswords, users } from "../../data/data.js";
import { getServer } from "../../functions/get-server.js";
import { getSessionIDCookie } from "../../functions/get-session-id-cookie.js";
import * as mockConnect from "../../mocks/persistence/connect.js";

jest.unstable_mockModule(
  `../../../main/src/persistence/connect.js`,
  () => mockConnect,
);

const { user01 } = users.$;
const { user01Password } = userPasswords.$;

const { account01, account06 } = accounts.$;

const { prepareTestDatabase } = await import(
  "../../functions/prepare-test-database.js"
);

const { disconnect } = await import("../../functions/disconnect.js");

let backup;

afterAll(async () => {
  await disconnect();
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
      .filter((account) => account.userID === user01.userID)
      .map((account) => {
        account.updatedAt = null;

        return account;
      });

    const sessionIDCookie = await getSessionIDCookie({
      password: user01Password,
      server,
      username: user01.username,
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
        password: user01Password,
        server,
        username: user01.username,
      });

      // when
      const response = await server
        .get(`/accounts/${account01.accountID}`)
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
          password: user01Password,
          server,
          username: user01.username,
        });

        // when
        const response = await server
          .get(`/accounts/${account06.accountID}`)
          .set("cookie", sessionIDCookie);

        // then
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(expectedAccount);
      });
    });
  });
});
