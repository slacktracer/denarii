import { NO_SUCH_TRANSFER } from "denarii/src/domain/data/errors.js";
import { describe, expect, test, vi } from "vitest";

import { transfers, userPasswords, users } from "../../data/data.js";
import { getServer } from "../../functions/get-server.js";
import { getSessionCookies } from "../../functions/get-session-cookies.js";
import * as mockConnect from "../../mocks/persistence/connect.js";

vi.mock(`../../../main/src/persistence/connect.js`, () => mockConnect);

const { user01 } = users.$;
const { user01Password } = userPasswords.$;

const { transfer04, transfer05 } = transfers.$;

describe("DELETE /transfers", () => {
  test("the transfer with the given ID is deleted", async () => {
    // given
    const expectedTransfer = { ...transfer04, deleted: true };

    const server = await getServer();

    const { secretCookie, sessionIDCookie } = await getSessionCookies({
      password: user01Password,
      server,
      username: user01.username,
    });

    // when
    const response = await server
      .delete(`/transfers/${transfer04.transferID}`)
      .set("cookie", [secretCookie, sessionIDCookie]);

    // then
    expect(response.status).toEqual(200);
    expect(response.body.deletedTransfer).toEqual(expectedTransfer);
  });

  describe("the transfer does not belong to the given user or does not exist", () => {
    test("an error is returned, no transfer is deleted", async () => {
      // given
      const server = await getServer();

      const { secretCookie, sessionIDCookie } = await getSessionCookies({
        password: user01Password,
        server,
        username: user01.username,
      });

      const expectedResponseBody = { message: NO_SUCH_TRANSFER.description };

      // when
      const response = await server
        .delete(`/transfers/${transfer05.transferID}`)
        .set("cookie", [secretCookie, sessionIDCookie]);

      // then
      expect(response.status).toEqual(404);
      expect(response.body).toEqual(expectedResponseBody);
    });
  });
});
