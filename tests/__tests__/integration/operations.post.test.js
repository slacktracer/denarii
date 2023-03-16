import { describe, expect, test, vi } from "vitest";

import { accounts, userPasswords, users } from "../../data/data.js";
import { getServer } from "../../functions/get-server.js";
import { getSessionCookies } from "../../functions/get-session-cookies.js";
import * as mockConnect from "../../mocks/persistence/connect.js";

vi.mock(`../../../main/src/persistence/connect.js`, () => mockConnect);

const { account01 } = accounts.$;
const { user01 } = users.$;
const { user01Password } = userPasswords.$;

describe("POST /operations", () => {
  test("a new operation is created and returned", async () => {
    // given
    const server = await getServer();

    const operationData = {
      accountID: account01.accountID,
      amount: 123_00,
      amountPerUnit: 123_00,
      comments: "This is a new operation!",
      type: "Income",
      unitCount: 1,
    };

    const expectedOperation = expect.objectContaining(operationData);

    const { secretCookie, sessionIDCookie } = await getSessionCookies({
      password: user01Password,
      server,
      username: user01.username,
    });

    // when
    const response = await server
      .post("/operations")
      .send(operationData)
      .set("cookie", [secretCookie, sessionIDCookie]);

    // then
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expectedOperation);
  });
});
