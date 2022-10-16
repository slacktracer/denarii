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
      accountID: account01.accountID,
      name: newAccountName,
      userID: user01.userID,
    });

    const expectedAccountCount = accounts.filter(
      (account) => account.userID === user01.userID,
    ).length;

    // when
    const updatedAccount = await updateAccount({
      accountID: account01.accountID,
      data: { initialAmount: 100, name: newAccountName },
      userID: user01.userID,
    });

    const actualAccountCount = (await readAccounts({ userID: user01.userID }))
      .length;

    // then
    expect(updatedAccount).toEqual(expectedAccount);
    expect(actualAccountCount).toEqual(expectedAccountCount);
  });
});
