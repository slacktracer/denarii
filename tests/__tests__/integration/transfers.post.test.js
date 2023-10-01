import { describe, expect, test, vi } from "vitest";

import {
  NO_SUCH_FROM_ACCOUNT,
  NO_SUCH_TO_ACCOUNT,
} from "../../../main/src/domain/data/errors.js";
import { accounts, userPasswords, users } from "../../data/data.js";
import { getServer } from "../../functions/get-server.js";
import { getSessionCookies } from "../../functions/get-session-cookies.js";
import * as mockConnect from "../../mocks/persistence/connect.js";

vi.mock(`../../../main/src/persistence/connect.js`, () => mockConnect);

const { account01, account02, account05, account06 } = accounts.$;
const { user01 } = users.$;
const { user01Password } = userPasswords.$;

describe("POST /transfers", () => {
  test("a new transfer is created and returned", async () => {
    // given
    const server = await getServer();

    const transferData = {
      amount: 10_000_00,
      at: new Date().toISOString(),
      fromAccountID: account01.accountID,
      toAccountID: account02.accountID,
    };

    const expectedTransfer = expect.objectContaining(transferData);

    const { secretCookie, sessionIDCookie } = await getSessionCookies({
      password: user01Password,
      server,
      username: user01.username,
    });

    // when
    const response = await server
      .post("/transfers")
      .send(transferData)
      .set("cookie", [secretCookie, sessionIDCookie]);

    // then
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expectedTransfer);
  });

  describe("the 'from account' does not belong to the given user or does not exist", () => {
    test("an error is returned, no transfer is created", async () => {
      // given
      const server = await getServer();

      const transferData = {
        amount: 10_000_00,
        at: new Date().toISOString(),
        fromAccountID: account05.accountID,
        toAccountID: account06.accountID,
      };

      const expectedResponseBody = {
        message: NO_SUCH_FROM_ACCOUNT.description,
      };

      const { secretCookie, sessionIDCookie } = await getSessionCookies({
        password: user01Password,
        server,
        username: user01.username,
      });

      // when
      const response = await server
        .post("/transfers")
        .send(transferData)
        .set("cookie", [secretCookie, sessionIDCookie]);

      // then
      expect(response.status).toEqual(400);
      expect(response.body).toEqual(expectedResponseBody);
    });
  });

  describe("the 'to account' does not belong to the given user or does not exist", () => {
    test("an error is returned, no transfer is created", async () => {
      // given
      const server = await getServer();

      const transferData = {
        amount: 10_000_00,
        at: new Date().toISOString(),
        fromAccountID: account01.accountID,
        toAccountID: account06.accountID,
      };

      const expectedResponseBody = {
        message: NO_SUCH_TO_ACCOUNT.description,
      };

      const { secretCookie, sessionIDCookie } = await getSessionCookies({
        password: user01Password,
        server,
        username: user01.username,
      });

      // when
      const response = await server
        .post("/transfers")
        .send(transferData)
        .set("cookie", [secretCookie, sessionIDCookie]);

      // then
      expect(response.status).toEqual(400);
      expect(response.body).toEqual(expectedResponseBody);
    });
  });
});
