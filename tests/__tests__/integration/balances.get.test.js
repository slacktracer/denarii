import { describe, expect, test, vi } from "vitest";

import { accounts, userPasswords, users } from "../../data/data.js";
import { getServer } from "../../functions/get-server.js";
import { getSessionCookies } from "../../functions/get-session-cookies.js";
import * as mockConnect from "../../mocks/persistence/connect.js";

vi.mock(`../../../main/src/persistence/connect.js`, () => mockConnect);

const { account01, account02, account03, account04, account05 } = accounts.$;
const { user01 } = users.$;
const { user01Password } = userPasswords.$;

describe("GET /balances", () => {
  test("returns the balances for each and all of the user's accounts", async () => {
    // given
    const server = await getServer();

    const { secretCookie, sessionIDCookie } = await getSessionCookies({
      password: user01Password,
      server,
      username: user01.username,
    });

    const expectedBalances = [
      {
        accountID: account01.accountID,
        name: "Account 1!",
        total: -39_600_00,
      },
      {
        accountID: account02.accountID,
        name: "Account 2!",
        total: 40_000_00,
      },
      {
        accountID: account03.accountID,
        name: "Account 3!",
        total: 0,
      },
      {
        accountID: account04.accountID,
        name: "Account 4!",
        total: 0,
      },
      {
        accountID: account05.accountID,
        name: "Account 5!",
        total: 0,
      },
    ];

    // when
    const response = await server
      .get("/balances")
      .set("cookie", [secretCookie, sessionIDCookie]);

    // then
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expectedBalances);
  });
});
