import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

import { accounts, users } from "../../../../../data/data.js";
import * as mockConnect from "../../../../../mocks/persistence/connect.js";

jest.unstable_mockModule(
  `../../../../../../main/src/persistence/connect.js`,
  () => mockConnect,
);

const { user01 } = users.$;

const { account01, account02, account03, account04, account05 } = accounts.$;

const { prepareTestDatabase } = await import(
  "../../../../../functions/prepare-test-database.js"
);

const { disconnect } = await import("../../../../../functions/disconnect.js");

const {
  balances: { calculateBalances },
} = await import(`denarii/src/persistence/persistence.js`);

let backup;

afterAll(async () => {
  await disconnect();
});

beforeAll(async () => {
  backup = await prepareTestDatabase();
});

beforeEach(async () => {
  backup.restore();
});

describe("calculate balances", () => {
  test("it returns all accounts balances", async () => {
    // given
    const expectedBalances = [
      {
        accountID: account01.accountID,
        total: -39_600_00,
      },
      {
        accountID: account02.accountID,
        total: 40_000_00,
      },
      {
        accountID: account03.accountID,
        total: 0,
      },
      {
        accountID: account04.accountID,
        total: 0,
      },
      {
        accountID: account05.accountID,
        total: 0,
      },
    ];

    // when
    const actualBalances = await calculateBalances({ userID: user01.userID });

    // then
    expect(actualBalances).toEqual(expectedBalances);
  });
});
