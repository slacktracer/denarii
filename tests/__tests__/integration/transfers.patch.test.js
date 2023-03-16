import { describe, expect, test, vi } from "vitest";

import { transfers, userPasswords, users } from "../../data/data.js";
import { getServer } from "../../functions/get-server.js";
import { getSessionCookies } from "../../functions/get-session-cookies.js";
import * as mockConnect from "../../mocks/persistence/connect.js";

vi.mock(`../../../main/src/persistence/connect.js`, () => mockConnect);

const { user01 } = users.$;
const { user01Password } = userPasswords.$;

const { transfer01 } = transfers.$;

describe("PATCH /transfers", () => {
  describe("an transfer ID was given", () => {
    test("an existing transfer is updated", async () => {
      // given
      const server = await getServer();

      const updatedTransferData = { amount: 3_000_00 };

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
  });
});
