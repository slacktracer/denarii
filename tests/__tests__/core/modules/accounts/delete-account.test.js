import { jest } from "@jest/globals";

import { accounts, accountID05, userID01 } from "../../../../data/data.js";
import { endConnections } from "../../../../functions/end-connections.js";

import * as mockPersistence from "../../../../mocks/persistence.js";

jest.unstable_mockModule(
  `../../../../../main/src/persistence/persistence.js`,
  () => mockPersistence,
);

const { prepareTestDatabase } = await import(
  "../../../../functions/prepare-test-database.js"
);

const { db, kv } = await import(
  `../../../../../main/src/persistence/persistence.js`
);

const { deleteAccount, readAccounts } = await import(
  `../../../../../main/src/core/modules/accounts/accounts.js`
);

let backup;

afterAll(async () => {
  await endConnections({ db, kv });
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
