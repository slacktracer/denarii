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
import { getSessionCookies } from "../../functions/get-session-cookies.js";
import { inspectTable } from "../../functions/inspect-table.js";
import * as mockConnect from "../../mocks/persistence/connect.js";

jest.unstable_mockModule(
  `../../../main/src/persistence/connect.js`,
  () => mockConnect,
);

const { user01 } = users.$;
const { user01Password } = userPasswords.$;

const { account01, account05, account06 } = accounts.$;

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

describe("DELETE /accounts", () => {
  describe("the account has no operations", () => {
    test("the account with the given ID is deleted", async () => {
      // given
      const user01AccountCount = accounts.filter(
        (account) => account.userID === user01.userID,
      ).length;

      const server = await getServer();

      const { secretCookie, sessionIDCookie } = await getSessionCookies({
        password: user01Password,
        server,
        username: user01.username,
      });

      const expectedDeletedRowsCount = 1;

      // when
      const response = await server
        .delete(`/accounts/${account05.accountID}`)
        .set("cookie", [secretCookie, sessionIDCookie]);

      const rows = inspectTable({
        table: "account",
        template: { userID: user01.userID },
      });

      // then
      expect(response.status).toEqual(200);
      expect(response.body.deletedRowsCount).toEqual(expectedDeletedRowsCount);
      expect(rows.length).toEqual(user01AccountCount - 1);
    });
  });

  describe("the account has operations", () => {
    test("an error is returned, the account is not deleted", async () => {
      // given
      const user01AccountCount = accounts.filter(
        (account) => account.userID === user01.userID,
      ).length;

      const server = await getServer();

      const { secretCookie, sessionIDCookie } = await getSessionCookies({
        password: user01Password,
        server,
        username: user01.username,
      });

      // when
      const response = await server
        .delete(`/accounts/${account01.accountID}`)
        .set("cookie", [secretCookie, sessionIDCookie]);

      const rows = inspectTable({
        table: "account",
        template: { userID: user01.userID },
      });

      // then
      expect(response.status).toEqual(500);
      expect(rows.length).toEqual(user01AccountCount);
    });
  });

  describe("the account does not belong to the given user or does not exist", () => {
    test("an error is returned, no account is deleted", async () => {
      // given
      const user01AccountCount = accounts.length;

      const server = await getServer();

      const { secretCookie, sessionIDCookie } = await getSessionCookies({
        password: user01Password,
        server,
        username: user01.username,
      });

      // when
      const response = await server
        .delete(`/accounts/${account06.accountID}`)
        .set("cookie", [secretCookie, sessionIDCookie]);

      const rows = inspectTable({ table: "account" });

      // then
      expect(response.status).toEqual(404);
      expect(rows.length).toEqual(user01AccountCount);
    });
  });
});
