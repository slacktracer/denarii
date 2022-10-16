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

const { prepareTestDatabase } = await import(
  "../../../../../functions/prepare-test-database.js"
);

const { disconnect } = await import("../../../../../functions/disconnect.js");

const {
  accounts: { createAccount, readAccounts },
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

describe("create account", () => {
  test("a new account is created", async () => {
    // given
    const initialAmount = 0;
    const name = "Account!";

    const accountData = { initialAmount, name, userID: user01.userID };

    const expectedCreatedAccount = expect.objectContaining({
      initialAmount,
      name,
      userID: user01.userID,
    });

    const expectedAccountCount =
      accounts.filter((account) => account.userID === user01.userID).length + 1;

    // when
    const createdAccount = await createAccount({
      data: accountData,
      userID: user01.userID,
    });

    const actualAccountCount = (await readAccounts({ userID: user01.userID }))
      .length;

    // then
    expect(createdAccount).toEqual(expectedCreatedAccount);
    expect(actualAccountCount).toEqual(expectedAccountCount);
  });
});
