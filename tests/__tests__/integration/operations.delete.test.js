import { describe, expect, test, vi } from "vitest";

import { NO_SUCH_OPERATION } from "../../../main/src/domain/data/errors.js";
import { operations, userPasswords, users } from "../../data/data.js";
import { getServer } from "../../functions/get-server.js";
import { getSessionCookies } from "../../functions/get-session-cookies.js";
import * as mockConnect from "../../mocks/persistence/connect.js";

vi.mock(`../../../main/src/persistence/connect.js`, () => mockConnect);

const { user01 } = users.$;
const { user01Password } = userPasswords.$;

const { operation04, operation05 } = operations.$;

describe("DELETE /operations", () => {
  test("the operation with the given ID is deleted", async () => {
    // given
    const expectedOperation = { ...operation04, deleted: true };

    const server = await getServer();

    const { secretCookie, sessionIDCookie } = await getSessionCookies({
      password: user01Password,
      server,
      username: user01.username,
    });

    // when
    const response = await server
      .delete(`/operations/${operation04.operationID}`)
      .set("cookie", [secretCookie, sessionIDCookie]);

    // then
    expect(response.status).toEqual(200);
    expect(response.body.deletedOperation).toEqual(expectedOperation);
  });

  describe("the operation does not belong to the given user or does not exist", () => {
    test("an error is returned, no operation is deleted", async () => {
      // given
      const server = await getServer();

      const { secretCookie, sessionIDCookie } = await getSessionCookies({
        password: user01Password,
        server,
        username: user01.username,
      });

      const expectedResponseBody = { message: NO_SUCH_OPERATION.description };

      // when
      const response = await server
        .delete(`/operations/${operation05.operationID}`)
        .set("cookie", [secretCookie, sessionIDCookie]);

      // then
      expect(response.status).toEqual(404);
      expect(response.body).toEqual(expectedResponseBody);
    });
  });
});
