import { describe, expect, test, vi } from "vitest";

import { accounts, users } from "../../../../../data/data.js";
import * as mockConnect from "../../../../../mocks/persistence/connect.js";

vi.mock(`../../../../../../main/src/persistence/connect.js`, () => mockConnect);

const { user01 } = users.$;

const { account01, account02, account03, account04, account05 } = accounts.$;

const {
  balances: { calculateBalances },
} = await import(`denarii/src/persistence/persistence.js`);

describe("calculate balances", () => {
  test("it returns all accounts balances", async () => {
    // given
    const expectedBalances = [
      {
        account_id: account01.accountID,
        total: -39_600_00,
      },
      {
        account_id: account02.accountID,
        total: 40_000_00,
      },
      {
        account_id: account03.accountID,
        total: 0,
      },
      {
        account_id: account04.accountID,
        total: 0,
      },
      {
        account_id: account05.accountID,
        total: 0,
      },
    ];

    // when
    const actualBalances = await calculateBalances({ userID: user01.userID });

    // then
    expect(actualBalances).toEqual(expectedBalances);
  });
});
