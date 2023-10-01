import { describe, expect, test, vi } from "vitest";

import {
  NO_SUCH_FROM_ACCOUNT,
  NO_SUCH_TO_ACCOUNT,
} from "../../../main/src/domain/data/errors.js";
import { accounts, transfers, userPasswords, users } from "../../data/data.js";
import { getServer } from "../../functions/get-server.js";
import { getSessionCookies } from "../../functions/get-session-cookies.js";
import * as mockConnect from "../../mocks/persistence/connect.js";

vi.mock(`../../../main/src/persistence/connect.js`, () => mockConnect);

const { user01 } = users.$;
const { user01Password } = userPasswords.$;

const { account03, account04, account05 } = accounts.$;
const { transfer01 } = transfers.$;

describe("PATCH /transfers", () => {
  describe("an transfer ID was given", () => {
    test("an existing transfer is updated", async () => {
      // given
      const server = await getServer();

      const updatedTransferData = {
        amount: 3_000_00,
        fromAccountID: account03.accountID,
        toAccountID: account04.accountID,
      };

      const expectedTransfer = expect.objectContaining(updatedTransferData);

      const { secretCookie, sessionIDCookie } = await getSessionCookies({
        password: user01Password,
        server,
        username: user01.username,
      });

      // when
      const response = await server
        .patch(`/transfers/${transfer01.transferID}`)
        .send(updatedTransferData)
        .set("cookie", [secretCookie, sessionIDCookie]);

      // then
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(expectedTransfer);
    });

    describe("the 'from account' does not belong to the given user or does not exist", () => {
      test("an error is returned, no transfer is updated", async () => {
        // given
        const server = await getServer();

        const updatedTransferData = {
          amount: 3_000_00,
          fromAccountID: account05.accountID,
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
          .patch(`/transfers/${transfer01.transferID}`)
          .send(updatedTransferData)
          .set("cookie", [secretCookie, sessionIDCookie]);

        // then
        expect(response.status).toEqual(400);
        expect(response.body).toEqual(expectedResponseBody);
      });
    });

    describe("the 'to account' does not belong to the given user or does not exist", () => {
      test("an error is returned, no transfer is updated", async () => {
        // given
        const server = await getServer();

        const updatedTransferData = {
          amount: 3_000_00,
          toAccountID: account05.accountID,
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
          .patch(`/transfers/${transfer01.transferID}`)
          .send(updatedTransferData)
          .set("cookie", [secretCookie, sessionIDCookie]);

        // then
        expect(response.status).toEqual(400);
        expect(response.body).toEqual(expectedResponseBody);
      });
    });
  });
});
