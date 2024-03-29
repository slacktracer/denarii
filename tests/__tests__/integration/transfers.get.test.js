import { describe, expect, test, vi } from "vitest";

import { transfers, userPasswords, users } from "../../data/data.js";
import { getServer } from "../../functions/get-server.js";
import { getSessionCookies } from "../../functions/get-session-cookies.js";
import * as mockConnect from "../../mocks/persistence/connect.js";

vi.mock(`../../../main/src/persistence/connect.js`, () => mockConnect);

const { user01 } = users.$;
const { user01Password } = userPasswords.$;

const { transfer01, transfer05 } = transfers.$;

describe("GET /transfers", () => {
  test("it returns all the given user transfers", async () => {
    // given
    const server = await getServer();

    const expectedTransfers = expect.arrayContaining(
      transfers
        .map((transfer) => Object.assign({}, transfer))
        .filter((transfer) => transfer.userID === user01.userID)
        .map((transfer) => {
          transfer.updatedAt = null;

          return transfer;
        }),
    );

    const { secretCookie, sessionIDCookie } = await getSessionCookies({
      password: user01Password,
      server,
      username: user01.username,
    });

    // when
    const response = await server
      .get("/transfers")
      .set("cookie", [secretCookie, sessionIDCookie]);

    // then
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expectedTransfers);
  });

  describe("an transfer ID was given", () => {
    test("it returns just the transfer with the given ID", async () => {
      // given
      const server = await getServer();

      const expectedTransfer = expect.objectContaining(transfer01);

      const { secretCookie, sessionIDCookie } = await getSessionCookies({
        password: user01Password,
        server,
        username: user01.username,
      });

      // when
      const response = await server
        .get(`/transfers/${transfer01.transferID}`)
        .set("cookie", [secretCookie, sessionIDCookie]);

      // then
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(expectedTransfer);
    });

    describe("the given transfer does not belong to the session user", () => {
      test("it returns null", async () => {
        // given
        const server = await getServer();

        const expectedTransfer = null;

        const { secretCookie, sessionIDCookie } = await getSessionCookies({
          password: user01Password,
          server,
          username: user01.username,
        });

        // when
        const response = await server
          .get(`/transfers/${transfer05.transferID}`)
          .set("cookie", [secretCookie, sessionIDCookie]);

        // then
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(expectedTransfer);
      });
    });
  });
});
