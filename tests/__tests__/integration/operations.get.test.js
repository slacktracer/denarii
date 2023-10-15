import { describe, expect, test, vi } from "vitest";

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

const { user01, user02 } = users.byBindingName;
const { user01Password, user02Password } = userPasswords.byBindingName;

const {
  operation01,
  operation05,
  operation10,
  operation12,
  operation13,
  operation14,
} = operations.byBindingName;

describe("GET /operations", () => {
  test("it returns all the given user operations", async () => {
    // given
    const server = await getServer();

    const expectedOperations = expect.arrayContaining(
      operations
        .map((operation) => Object.assign({}, operation))
        .filter((operation) => operation.userID === user01.userID)
        .map((operation) => {
          operation.updatedAt = null;

          operation.account = {
            accountID: accounts.byID[operation.accountID].accountID,
            name: accounts.byID[operation.accountID].name,
          };

          operation.category = {
            categoryID: categories.byID[operation.categoryID].categoryID,
            name: categories.byID[operation.categoryID].name,
          };

          return operation;
        }),
    );

    const { secretCookie, sessionIDCookie } = await getSessionCookies({
      password: user01Password,
      server,
      username: user01.username,
    });

    // when
    const response = await server
      .get("/operations")
      .set("cookie", [secretCookie, sessionIDCookie]);

    // then
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expectedOperations);
  });

  describe("a datetime range is given", () => {
    test("it returns all the given user operations for the given datetime range", async () => {
      // given
      const server = await getServer();

      const expectedOperations = [operation12]
        .map((operation) => Object.assign({}, operation))
        .map((operation) => {
          operation.updatedAt = null;

          operation.account = {
            accountID: accounts.byID[operation.accountID].accountID,
            name: accounts.byID[operation.accountID].name,
          };

          operation.category = {
            categoryID: categories.byID[operation.categoryID].categoryID,
            name: categories.byID[operation.categoryID].name,
          };

          return operation;
        });

      const from = "2023-08-01T00:00:00.000Z";
      const to = "2023-08-07T21:00:00.000Z";

      const { secretCookie, sessionIDCookie } = await getSessionCookies({
        password: user02Password,
        server,
        username: user02.username,
      });

      // when
      const response = await server
        .get(`/operations?from=${from}&to=${to}`)
        .set("cookie", [secretCookie, sessionIDCookie]);

      // then
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(expectedOperations);
    });
  });

  describe("only a starting datetime is given", () => {
    test("it returns all the given user operations since the given starting datetime", async () => {
      // given
      const server = await getServer();

      const expectedOperations = [operation05, operation10, operation13]
        .map((operation) => Object.assign({}, operation))
        .map((operation) => {
          operation.updatedAt = null;

          operation.account = {
            accountID: accounts.byID[operation.accountID].accountID,
            name: accounts.byID[operation.accountID].name,
          };

          operation.category = {
            categoryID: categories.byID[operation.categoryID].categoryID,
            name: categories.byID[operation.categoryID].name,
          };

          return operation;
        });

      const from = "2023-08-07T21:01:00.000Z";

      const { secretCookie, sessionIDCookie } = await getSessionCookies({
        password: user02Password,
        server,
        username: user02.username,
      });

      // when
      const response = await server
        .get(`/operations?from=${from}`)
        .set("cookie", [secretCookie, sessionIDCookie]);

      // then
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(expectedOperations);
    });
  });

  describe("only a ending datetime is given", () => {
    test("it returns all the given user operations from before the given ending datetime", async () => {
      // given
      const server = await getServer();

      const expectedOperations = [operation14]
        .map((operation) => Object.assign({}, operation))
        .map((operation) => {
          operation.updatedAt = null;

          operation.account = {
            accountID: accounts.byID[operation.accountID].accountID,
            name: accounts.byID[operation.accountID].name,
          };

          operation.category = {
            categoryID: categories.byID[operation.categoryID].categoryID,
            name: categories.byID[operation.categoryID].name,
          };

          return operation;
        });

      const to = "2012-11-01T12:00:59.000Z";

      const { secretCookie, sessionIDCookie } = await getSessionCookies({
        password: user02Password,
        server,
        username: user02.username,
      });

      // when
      const response = await server
        .get(`/operations?to=${to}`)
        .set("cookie", [secretCookie, sessionIDCookie]);

      // then
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(expectedOperations);
    });
  });

  describe("an operation ID was given", () => {
    test("it returns just the operation with the given ID", async () => {
      // given
      const server = await getServer();

      const expectedOperation = expect.objectContaining({
        ...operation01,
        account: {
          accountID: accounts.byID[operation01.accountID].accountID,
          name: accounts.byID[operation01.accountID].name,
        },
        category: {
          categoryID: categories.byID[operation01.categoryID].categoryID,
          name: categories.byID[operation01.categoryID].name,
        },
      });

      const { secretCookie, sessionIDCookie } = await getSessionCookies({
        password: user01Password,
        server,
        username: user01.username,
      });

      // when
      const response = await server
        .get(`/operations/${operation01.operationID}`)
        .set("cookie", [secretCookie, sessionIDCookie]);

      // then
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(expectedOperation);
    });

    describe("the given operation does not belong to the session user", () => {
      test("it returns null", async () => {
        // given
        const server = await getServer();

        const expectedOperation = null;

        const { secretCookie, sessionIDCookie } = await getSessionCookies({
          password: user01Password,
          server,
          username: user01.username,
        });

        // when
        const response = await server
          .get(`/operations/${operation05.operationID}`)
          .set("cookie", [secretCookie, sessionIDCookie]);

        // then
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(expectedOperation);
      });
    });
  });
});
