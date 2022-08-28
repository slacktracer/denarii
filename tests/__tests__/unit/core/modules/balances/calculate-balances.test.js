import { jest } from "@jest/globals";

import {
  accountID01,
  accountID02,
  accountID03,
  accountID04,
  accountID05,
  userID01,
} from "../../../../../data/data.js";
import { endConnections } from "../../../../../functions/end-connections.js";

import * as mockPersistence from "../../../../../mocks/persistence.js";

jest.unstable_mockModule(
  `../../../../../../main/src/persistence/persistence.js`,
  () => mockPersistence,
);

const { prepareTestDatabase } = await import(
  "../../../../../functions/prepare-test-database.js"
);

const { db, redisServer } = await import(
  `denarii/src/persistence/persistence.js`
);

const { calculateBalances } = await import(
  `denarii/src/persistence/modules/balances/balances.js`
);

let backup;

afterAll(async () => {
  await endConnections({ db, redisServer });
});

beforeAll(async () => {
  backup = await prepareTestDatabase();
});

beforeEach(async () => {
  backup.restore();
});

describe("calculate balances", () => {
  it("returns all accounts balances", async () => {
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
