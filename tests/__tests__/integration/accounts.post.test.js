import { describe, expect, test, vi } from "vitest";

import { userPasswords, users } from "../../data/data.js";
import { getServer } from "../../functions/get-server.js";
import { getSessionCookies } from "../../functions/get-session-cookies.js";
import * as mockConnect from "../../mocks/persistence/connect.js";

vi.mock(`../../../main/src/persistence/connect.js`, () => mockConnect);

const { user01 } = users.$;
const { user01Password } = userPasswords.$;

describe("POST /accounts", () => {
  test("a new account is created and returned", async () => {
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
      .post("/accounts")
      .send({ initialAmount, name })
      .set("cookie", [secretCookie, sessionIDCookie]);

    // then
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expectedAccount);
  });
});
