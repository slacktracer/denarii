import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

import { accounts, operations, users } from "../../../../../data/data.js";
import * as mockConnect from "../../../../../mocks/persistence/connect.js";

jest.unstable_mockModule(
  `../../../../../../main/src/persistence/connect.js`,
  () => mockConnect,
);

const { account01 } = accounts.$;
const { user01 } = users.$;

const { prepareTestDatabase } = await import(
  "../../../../../functions/prepare-test-database.js"
);

const { disconnect } = await import("../../../../../functions/disconnect.js");

const {
  operations: { createOperation, readOperations },
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

describe("create operation", () => {
  test("a new operation is created", async () => {
    // given
    const amount = 1;
    const amountPerUnit = 100;
    const comments = "";
    const type = "Expense";
    const unitCount = 1;

    const data = {
      accountID: account01.accountID,
      amount,
      amountPerUnit,
      comments,
      type,
      unitCount,
    };

    const expectedCreatedOperation = expect.objectContaining({
      accountID: account01.accountID,
      amount,
      amountPerUnit,
      comments,
      type,
      unitCount,
      userID: user01.userID,
    });

    const expectedOperationCount =
      operations.filter((operation) => operation.userID === user01.userID)
        .length + 1;

    // when
    const createdOperation = await createOperation({
      data,
      userID: user01.userID,
    });

    const actualOperationCount = (
      await readOperations({ userID: user01.userID })
    ).length;

    // then
    expect(createdOperation).toEqual(expectedCreatedOperation);
    expect(actualOperationCount).toEqual(expectedOperationCount);
  });
});
