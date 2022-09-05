import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

import { accounts, userID01 } from "../../../../../data/data.js";
import { endConnections } from "../../../../../functions/end-connections.js";

import * as mockConnect from "../../../../../mocks/persistence/connect.js";

jest.unstable_mockModule(
  `../../../../../../main/src/persistence/connect.js`,
  () => mockConnect,
);

const { prepareTestDatabase } = await import(
  "../../../../../functions/prepare-test-database.js"
);

const { db, legacyRedisClient, redisServer } = await import(
  `denarii/src/persistence/connect.js`
);

const { createAccount } = await import(
  `denarii/src/persistence/modules/accounts/create-account.js`
);

const { readAccounts } = await import(
  `denarii/src/persistence/modules/accounts/read-accounts.js`
);

let backup;

afterAll(async () => {
  await endConnections({ db, legacyRedisClient, redisServer });
});

beforeAll(async () => {
  backup = await prepareTestDatabase();
});

beforeEach(async () => {
  backup.restore();
});

describe("create account", () => {
  test("a new account is created", async () => {
    // given
    const initialAmount = 0;
    const name = "Account!";

    const accountData = { initialAmount, name, userID: userID01 };

    const expectedCreatedAccount = expect.objectContaining({
      initialAmount,
      name,
      userID: userID01,
    });

    const expectedAccountCount =
      accounts.filter((account) => account.userID === userID01).length + 1;

    // when
    const createdAccount = await createAccount({
      data: accountData,
      userID: userID01,
    });

    const actualAccountCount = (await readAccounts({ userID: userID01 }))
      .length;

    // then
    expect(createdAccount).toEqual(expectedCreatedAccount);
    expect(actualAccountCount).toEqual(expectedAccountCount);
  });
});
