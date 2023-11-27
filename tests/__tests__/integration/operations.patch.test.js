import { describe, expect, test, vi } from "vitest";

import {
  NO_SUCH_ACCOUNT,
  NO_SUCH_CATEGORY,
} from "../../../main/src/domain/data/errors.js";
import {
  accounts,
  categories,
  operations,
  userPasswords,
  users,
} from "../../data/data.js";
import { getServer } from "../../functions/get-server.js";
import { getSessionCookies } from "../../functions/get-session-cookies.js";
import * as mockConnect from "../../mocks/persistence/connect.js";

vi.mock(`../../../main/src/persistence/connect.js`, () => mockConnect);

const { user01 } = users.$;
const { user01Password } = userPasswords.$;

const { account04, account05 } = accounts.$;
const { category02, category05 } = categories.$;
const { operation01 } = operations.$;

describe("PATCH /operations", () => {
  describe("an operation ID was given", () => {
    test("an existing operation is updated", async () => {
      // given
      const server = await getServer();

      const updatedOperationData = {
        accountID: account04.accountID,
        amount: 3_000_00,
        at: "2023-11-27T21:31:00.000Z",
        categoryID: category02.categoryID,
      };

      const expectedOperation = expect.objectContaining(updatedOperationData);

      const { secretCookie, sessionIDCookie } = await getSessionCookies({
        password: user01Password,
        server,
        username: user01.username,
      });

      // when
      const response = await server
        .patch(`/operations/${operation01.operationID}`)
        .send(updatedOperationData)
        .set("cookie", [secretCookie, sessionIDCookie]);

      // then
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(expectedOperation);
    });

    describe("the given account does not belong to the given user or does not exist", () => {
      test("an error is returned, no operation is updated", async () => {
        // given
        const server = await getServer();

        const updatedOperationData = {
          accountID: account05.accountID,
          amount: 3_000_00,
          at: "2023-11-27T21:31:00.000Z",
          categoryID: category02.categoryID,
        };

        const expectedResponseBody = { message: NO_SUCH_ACCOUNT.description };

        const { secretCookie, sessionIDCookie } = await getSessionCookies({
          password: user01Password,
          server,
          username: user01.username,
        });

        // when
        const response = await server
          .patch(`/operations/${operation01.operationID}`)
          .send(updatedOperationData)
          .set("cookie", [secretCookie, sessionIDCookie]);

        // then
        expect(response.status).toEqual(400);
        expect(response.body).toEqual(expectedResponseBody);
      });
    });

    describe("the given category does not belong to the given user or does not exist", () => {
      test("an error is returned, no operation is updated", async () => {
        // given
        const server = await getServer();

        const updatedOperationData = {
          accountID: account04.accountID,
          amount: 3_000_00,
          at: "2023-11-27T21:31:00.000Z",
          categoryID: category05.categoryID,
        };

        const expectedResponseBody = { message: NO_SUCH_CATEGORY.description };

        const { secretCookie, sessionIDCookie } = await getSessionCookies({
          password: user01Password,
          server,
          username: user01.username,
        });

        // when
        const response = await server
          .patch(`/operations/${operation01.operationID}`)
          .send(updatedOperationData)
          .set("cookie", [secretCookie, sessionIDCookie]);

        // then
        expect(response.status).toEqual(400);
        expect(response.body).toEqual(expectedResponseBody);
      });
    });
  });
});
