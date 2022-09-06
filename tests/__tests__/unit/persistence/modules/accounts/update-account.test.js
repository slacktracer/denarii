import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

import { accountID01, accounts, userID01 } from "../../../../../data/data.js";
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
  accounts: { readAccounts, updateAccount },
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
      data: { initialAmount: 100, name: newAccountName },
      userID: userID01,
    });

    const actualAccountCount = (await readAccounts({ userID: userID01 }))
      .length;

    // then
    expect(updatedAccount).toEqual(expectedAccount);
    expect(actualAccountCount).toEqual(expectedAccountCount);
  });
});
