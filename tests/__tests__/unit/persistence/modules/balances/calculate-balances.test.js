import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

import {
  accountID01,
  accountID02,
  accountID03,
  accountID04,
  accountID05,
  userID01,
} from "../../../../../data/data.js";
import * as mockConnect from "../../../../../mocks/persistence/connect.js";

jest.unstable_mockModule(
  `../../../../../../main/src/persistence/connect.js`,
  () => mockConnect,
);

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
        accountID: accountID01,
        total: -39_600_00,
      },
      {
        accountID: accountID02,
        total: 40_000_00,
      },
      {
        accountID: accountID03,
        total: 0,
      },
      {
        accountID: accountID04,
        total: 0,
      },
      {
        accountID: accountID05,
        total: 0,
      },
    ];

    // when
    const actualBalances = await calculateBalances({ userID: userID01 });

    // then
    expect(actualBalances).toEqual(expectedBalances);
  });
});
