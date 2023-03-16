import {
  ACCOUNT_HAS_OPERATION_OR_TRANSFER,
  NO_SUCH_ACCOUNT,
} from "denarii/src/domain/data/errors.js";
import { describe, expect, test, vi } from "vitest";

import { accounts, userPasswords, users } from "../../data/data.js";
import { getServer } from "../../functions/get-server.js";
import { getSessionCookies } from "../../functions/get-session-cookies.js";
import * as mockConnect from "../../mocks/persistence/connect.js";

vi.mock(`../../../main/src/persistence/connect.js`, () => mockConnect);

const { user01 } = users.$;
const { user01Password } = userPasswords.$;

const { account01, account05, account06 } = accounts.$;

describe("DELETE /accounts", () => {
  describe("the account has no operations", () => {
    test("the account with the given ID is deleted", async () => {
      // given
      const expectedAccount = { ...account05, deleted: true };

      const server = await getServer();

      const { secretCookie, sessionIDCookie } = await getSessionCookies({
        password: user01Password,
        server,
        username: user01.username,
      });

      // when
      const response = await server
        .delete(`/accounts/${account05.accountID}`)
        .set("cookie", [secretCookie, sessionIDCookie]);

      // then
      expect(response.status).toEqual(200);
      expect(response.body.deletedAccount).toEqual(expectedAccount);
    });
  });

  describe("the account has operations", () => {
    test("an error is returned, the account is not deleted", async () => {
      // given
      const server = await getServer();

      const { secretCookie, sessionIDCookie } = await getSessionCookies({
        password: user01Password,
        server,
        username: user01.username,
      });

      const expectedResponseBody = {
        message: ACCOUNT_HAS_OPERATION_OR_TRANSFER.description,
      };

      // when
      const response = await server
        .delete(`/accounts/${account01.accountID}`)
        .set("cookie", [secretCookie, sessionIDCookie]);

      // then
      expect(response.status).toEqual(400);
      expect(response.body).toEqual(expectedResponseBody);
    });
  });

  describe("the account does not belong to the given user or does not exist", () => {
    test("an error is returned, no account is deleted", async () => {
      // given
      const server = await getServer();

      const { secretCookie, sessionIDCookie } = await getSessionCookies({
        password: user01Password,
        server,
        username: user01.username,
      });

      const expectedResponseBody = { message: NO_SUCH_ACCOUNT.description };

      // when
      const response = await server
        .delete(`/accounts/${account06.accountID}`)
        .set("cookie", [secretCookie, sessionIDCookie]);

      // then
      expect(response.status).toEqual(404);
      expect(response.body).toEqual(expectedResponseBody);
    });
  });
});
