import { describe, expect, test, vi } from "vitest";

import { accounts, userPasswords, users } from "../../data/data.js";
import { getServer } from "../../functions/get-server.js";
import { getSessionCookies } from "../../functions/get-session-cookies.js";
import * as mockConnect from "../../mocks/persistence/connect.js";

vi.mock(`../../../main/src/persistence/connect.js`, () => mockConnect);

const { user01 } = users.$;
const { user01Password } = userPasswords.$;

const { account01 } = accounts.$;

describe("PATCH /accounts", () => {
  describe("an account ID was given", () => {
    test("an existing account is updated", async () => {
      // given
      const server = await getServer();

      const initialAmount = 0;
      const name = "New Account!";

      const expectedAccount = expect.objectContaining({ initialAmount, name });

      const { secretCookie, sessionIDCookie } = await getSessionCookies({
        password: user01Password,
        server,
        username: user01.username,
      });

      // when
      const response = await server
        .patch(`/accounts/${account01.accountID}`)
        .send({ initialAmount, name })
        .set("cookie", [secretCookie, sessionIDCookie]);

      // then
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(expectedAccount);
    });
  });
});
