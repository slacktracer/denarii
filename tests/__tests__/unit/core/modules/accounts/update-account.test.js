import { jest } from "@jest/globals";

import { accountID01, accounts, userID01 } from "../../../../../data/data.js";
import { endConnections } from "../../../../../functions/end-connections.js";

import * as mockPersistence from "../../../../../mocks/persistence.js";

jest.unstable_mockModule(
  `../../../../../main/src/persistence/persistence.js`,
  () => mockPersistence,
);

const { prepareTestDatabase } = await import(
  "../../../../../functions/prepare-test-database.js"
);

const { db, redisServer } = await import(
  `denarii/src/persistence/persistence.js`
);

const { readAccounts, updateAccount } = await import(
  `denarii/src/core/modules/accounts/accounts.js`
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

describe("update account", () => {
  test("an existing account is updated", async () => {
    // given
    const newAccountName = "New Account Name!";

    const expectedAccount = expect.objectContaining({
      accountID: accountID01,
      name: newAccountName,
      userID: userID01,
    });

    const expectedAccountCount = accounts.filter(
      (account) => account.userID === userID01,
    ).length;

    // when
    const updatedAccount = await updateAccount({
      accountID: accountID01,
      data: { name: newAccountName },
      userID: userID01,
    });

    const actualAccountCount = (await readAccounts({ userID: userID01 }))
      .length;

    // then
    expect(updatedAccount).toEqual(expectedAccount);
    expect(actualAccountCount).toEqual(expectedAccountCount);
  });
});
