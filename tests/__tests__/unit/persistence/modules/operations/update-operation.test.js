import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

import { operations, users } from "../../../../../data/data.js";
import * as mockConnect from "../../../../../mocks/persistence/connect.js";

jest.unstable_mockModule(
  `../../../../../../main/src/persistence/connect.js`,
  () => mockConnect,
);

const { user01 } = users.$;

const { operation01 } = operations.$;

const { prepareTestDatabase } = await import(
  "../../../../../functions/prepare-test-database.js"
);

const { disconnect } = await import("../../../../../functions/disconnect.js");

const {
  operations: { readOperations, updateOperation },
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

describe("update operation", () => {
  test("an existing operation is updated", async () => {
    // given
    const newOperationAmount = 10000;

    const expectedOperation = expect.objectContaining({
      operationID: operation01.operationID,
      amount: newOperationAmount,
      userID: user01.userID,
    });

    const expectedOperationCount = operations.filter(
      (operation) => operation.userID === user01.userID,
    ).length;

    // when
    const updatedOperation = await updateOperation({
      operationID: operation01.operationID,
      data: { amount: newOperationAmount },
      userID: user01.userID,
    });

    const actualOperationCount = (
      await readOperations({ userID: user01.userID })
    ).length;

    // then
    expect(updatedOperation).toEqual(expectedOperation);
    expect(actualOperationCount).toEqual(expectedOperationCount);
  });
});
