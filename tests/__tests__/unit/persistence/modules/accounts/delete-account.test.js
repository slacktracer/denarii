import { jest } from "@jest/globals";

import { accounts, accountID05, userID01 } from "../../../../../data/data.js";
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
  `denarii/src/persistence/persistence.js`
);

const { deleteAccount } = await import(
  `denarii/src/persistence/modules/accounts/delete-account.js`
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

describe("delete account", () => {
  test("an existing account is deleted", async () => {
    // given
    const expectedAccountCount =
      accounts.filter((account) => account.userID === userID01).length - 1;

    // when
    await deleteAccount({ accountID: accountID05, userID: userID01 });
    const actualAccountCount = (await readAccounts({ userID: userID01 }))
      .length;

    // then
    expect(actualAccountCount).toEqual(expectedAccountCount);
  });
});
