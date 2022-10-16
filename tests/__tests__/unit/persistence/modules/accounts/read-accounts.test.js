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
  accounts: { readAccounts },
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

describe("read accounts", () => {
  test("all existing accounts for the given user are returned", async () => {
    // given
    const expectedAccountCount = accounts.filter(
      (account) => account.userID === user01.userID,
    ).length;

    // when
    const actualAccounts = await readAccounts({ userID: user01.userID });

    // then
    expect(actualAccounts.length).toEqual(expectedAccountCount);
  });
});
