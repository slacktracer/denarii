import { describe, expect, test, vi } from "vitest";

import {
  NO_SUCH_ACCOUNT,
  NO_SUCH_CATEGORY,
} from "../../../main/src/domain/data/errors.js";
import { accounts, categories, userPasswords, users } from "../../data/data.js";
import { getServer } from "../../functions/get-server.js";
import { getSessionCookies } from "../../functions/get-session-cookies.js";
import * as mockConnect from "../../mocks/persistence/connect.js";

vi.mock(`../../../main/src/persistence/connect.js`, () => mockConnect);

const { account01, account05 } = accounts.$;
const { category03, category05 } = categories.$;
const { user01 } = users.$;
const { user01Password } = userPasswords.$;

describe("POST /operations", () => {
  test("a new operation is created and returned", async () => {
    // given
    const server = await getServer();

    const operationData = {
      accountID: account01.accountID,
      amount: 123_00,
      amountPerUnit: 123_00,
      at: new Date().toISOString(),
      categoryID: category03.categoryID,
      comments: "This is a new operation!",
      type: "Income",
      unitCount: 1,
    };

    const expectedOperation = expect.objectContaining(operationData);

    const { secretCookie, sessionIDCookie } = await getSessionCookies({
      password: user01Password,
      server,
      username: user01.username,
    });

    // when
    const response = await server
      .post("/operations")
      .send(operationData)
      .set("cookie", [secretCookie, sessionIDCookie]);

    // then
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expectedOperation);
  });

  describe("the account does not belong to the given user or does not exist", () => {
    test("an error is returned, no operation is created", async () => {
      // given
      const server = await getServer();

      const operationData = {
        accountID: account05.accountID,
        amount: 123_00,
        amountPerUnit: 123_00,
        at: new Date().toISOString(),
        categoryID: category03.categoryID,
        comments: "This is a new operation!",
        type: "Income",
        unitCount: 1,
      };

      const expectedResponseBody = { message: NO_SUCH_ACCOUNT.description };

      const { secretCookie, sessionIDCookie } = await getSessionCookies({
        password: user01Password,
        server,
        username: user01.username,
      });

      // when
      const response = await server
        .post("/operations")
        .send(operationData)
        .set("cookie", [secretCookie, sessionIDCookie]);

      // then
      expect(response.status).toEqual(400);
      expect(response.body).toEqual(expectedResponseBody);
    });
  });

  describe("the given category does not belong to the given user or does not exist", () => {
    test("an error is returned, no operation is created", async () => {
      // given
      const server = await getServer();

      const operationData = {
        accountID: account01.accountID,
        amount: 123_00,
        amountPerUnit: 123_00,
        at: new Date().toISOString(),
        categoryID: category05.categoryID,
        comments: "This is a new operation!",
        type: "Income",
        unitCount: 1,
      };

      const expectedResponseBody = { message: NO_SUCH_CATEGORY.description };

      const { secretCookie, sessionIDCookie } = await getSessionCookies({
        password: user01Password,
        server,
        username: user01.username,
      });

      // when
      const response = await server
        .post("/operations")
        .send(operationData)
        .set("cookie", [secretCookie, sessionIDCookie]);

      // then
      expect(response.status).toEqual(400);
      expect(response.body).toEqual(expectedResponseBody);
    });
  });
});
