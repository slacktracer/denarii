import { jest } from "@jest/globals";

import { account01, accountID01, userID01 } from "../../../../data/data.js";
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

const { readAccount } = await import(
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

describe("read account", () => {
  test("an existing account is returned", async () => {
    // given
    const expectedAccount = expect.objectContaining({
      ...account01,
    });

    // when
    const actualAccount = await readAccount({
      accountID: accountID01,
      userID: userID01,
    });

    // then
    expect(actualAccount).toEqual(expectedAccount);
  });
});
