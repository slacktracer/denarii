import { jest } from "@jest/globals";

import { accounts, userID01 } from "../../../../data/data.js";
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

const { readAccounts } = await import(
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

describe("read accounts", () => {
  test("all existing accounts for the given user are returned", async () => {
    // given
    const expectedAccountCount = accounts.filter(
      (account) => account.userID === userID01,
    ).length;

    // when
    const actualAccounts = await readAccounts({ userID: userID01 });

    // then
    expect(actualAccounts.length).toEqual(expectedAccountCount);
  });
});
