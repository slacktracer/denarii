import { describe, expect, test, vi } from "vitest";

import { accounts, userPasswords, users } from "../../data/data.js";
import { getServer } from "../../functions/get-server.js";
import { getSessionCookies } from "../../functions/get-session-cookies.js";
import * as mockConnect from "../../mocks/persistence/connect.js";

vi.mock(`../../../../main/src/persistence/connect.js`, () => mockConnect);

const { user01 } = users.$;
const { user01Password } = userPasswords.$;
const { account01, account06 } = accounts.$;

describe("GET /accounts", () => {
  test("it returns all the given user accounts", async () => {
    // given
    const server = await getServer();

    const expectedAccounts = expect.arrayContaining(
      accounts
        .map((account) => Object.assign({}, account))
        .filter((account) => account.userID === user01.userID)
        .map((account) => {
          account.updatedAt = null;

          return account;
        }),
    );

    const { secretCookie, sessionIDCookie } = await getSessionCookies({
      password: user01Password,
      server,
      username: user01.username,
    });

    // when
    const response = await server
      .get("/accounts")
      .set("cookie", [secretCookie, sessionIDCookie]);

    // then
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expectedAccounts);
  });

  describe("an account ID was given", () => {
    test("it returns just the account with the given ID", async () => {
      // given
      const server = await getServer();

      const expectedAccount = expect.objectContaining(account01);

      const { secretCookie, sessionIDCookie } = await getSessionCookies({
        password: user01Password,
        server,
        username: user01.username,
      });

      // when
      const response = await server
        .get(`/accounts/${account01.accountID}`)
        .set("cookie", [secretCookie, sessionIDCookie]);

      // then
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(expectedAccount);
    });

    describe("the given account does not belong to the session user", () => {
      test("it returns null", async () => {
        // given
        const server = await getServer();

        const expectedAccount = null;

        const { secretCookie, sessionIDCookie } = await getSessionCookies({
          password: user01Password,
          server,
          username: user01.username,
        });

        // when
        const response = await server
          .get(`/accounts/${account06.accountID}`)
          .set("cookie", [secretCookie, sessionIDCookie]);

        // then
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(expectedAccount);
      });
    });
  });
});
