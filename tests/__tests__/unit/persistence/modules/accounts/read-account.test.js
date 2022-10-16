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

const { account01 } = accounts.$;

const { prepareTestDatabase } = await import(
  "../../../../../functions/prepare-test-database.js"
);

const { disconnect } = await import("../../../../../functions/disconnect.js");

const {
  accounts: { readAccount },
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

describe("read account", () => {
  test("an existing account is returned", async () => {
    // given
    const expectedAccount = expect.objectContaining({
      ...account01,
      createdAt: new Date(account01.createdAt),
    });

    // when
    const actualAccount = await readAccount({
      accountID: account01.accountID,
      userID: user01.userID,
    });

    // then
    expect(actualAccount).toEqual(expectedAccount);
  });
});
