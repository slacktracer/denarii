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

const { account01, account02 } = accounts.$;

const { prepareTestDatabase } = await import(
  "../../../../../functions/prepare-test-database.js"
);

const { disconnect } = await import("../../../../../functions/disconnect.js");

const {
  transfers: { createTransfer },
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

describe("create transfer", () => {
  test("a new transfer is created", async () => {
    // given
    const amount = 10_000_00;
    const at = new Date();
    const fromAccountID = account01.accountID;
    const toAccountID = account02.accountID;
    const userID = user01.userID;

    const transferData = { amount, at, fromAccountID, toAccountID };

    const expectedCreatedTransfer = expect.objectContaining({
      amount,
      at,
      fromAccountID,
      toAccountID,
      userID,
    });

    // when
    const createdTransfer = await createTransfer({
      data: transferData,
      userID,
    });

    // then
    expect(createdTransfer).toEqual(expectedCreatedTransfer);
  });
});
