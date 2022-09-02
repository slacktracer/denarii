import { jest } from "@jest/globals";

import {
  operationID01,
  operations,
  userID01,
} from "../../../../../data/data.js";
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

const { readOperations, updateOperation } = await import(
  `denarii/src/persistence/modules/operations/operations.js`
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

describe("update operation", () => {
  test("an existing operation is updated", async () => {
    // given
    const newOperationAmount = 10000;

    const expectedOperation = expect.objectContaining({
      operationID: operationID01,
      amount: newOperationAmount,
      userID: userID01,
    });

    const expectedOperationCount = operations.filter(
      (operation) => operation.userID === userID01,
    ).length;

    // when
    const updatedOperation = await updateOperation({
      operationID: operationID01,
      data: { amount: newOperationAmount },
      userID: userID01,
    });

    const actualOperationCount = (await readOperations({ userID: userID01 }))
      .length;

    // then
    expect(updatedOperation).toEqual(expectedOperation);
    expect(actualOperationCount).toEqual(expectedOperationCount);
  });
});
