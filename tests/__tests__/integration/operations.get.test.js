import { describe, expect, test, vi } from "vitest";

import { operations, userPasswords, users } from "../../data/data.js";
import { getServer } from "../../functions/get-server.js";
import { getSessionCookies } from "../../functions/get-session-cookies.js";
import * as mockConnect from "../../mocks/persistence/connect.js";

vi.mock(`../../../main/src/persistence/connect.js`, () => mockConnect);

const { user01 } = users.$;
const { user01Password } = userPasswords.$;

const { operation01, operation05 } = operations.$;

describe("GET /operations", () => {
  test("it returns all the given user operations", async () => {
    // given
    const server = await getServer();

    const expectedOperations = expect.arrayContaining(
      operations
        .filter((operation) => operation.userID === user01.userID)
        .map((operation) => {
          operation.updatedAt = null;

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

  describe("an operation ID was given", () => {
    test("it returns just the operation with the given ID", async () => {
      // given
      const server = await getServer();

      const expectedOperation = expect.objectContaining(operation01);

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