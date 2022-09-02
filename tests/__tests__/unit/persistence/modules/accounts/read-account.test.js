import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

import { account01, accountID01, userID01 } from "../../../../../data/data.js";
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

const { readAccount } = await import(
  `denarii/src/persistence/modules/accounts/read-account.js`
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

describe("read account", () => {
  test("an existing account is returned", async () => {
    // given
    const expectedAccount = expect.objectContaining({
      ...account01,
      createdAt: new Date(account01.createdAt),
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
