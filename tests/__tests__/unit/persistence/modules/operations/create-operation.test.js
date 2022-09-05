import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

import {
  accountID01,
  categoryID01,
  groupID01,
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
  `denarii/src/persistence/connect.js`
);

const {
  operations: { createOperation, readOperations },
} = await import(`denarii/src/persistence/persistence.js`);

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

describe("create operation", () => {
  test("a new operation is created", async () => {
    // given
    const amount = 1;
    const amountPerUnit = 100;
    const comments = "";
    const type = "Expense";
    const unitCount = 1;

    const data = {
      accountID: accountID01,
      amount,
      amountPerUnit,
      categoryID: categoryID01,
      comments,
      groupID: groupID01,
      type,
      unitCount,
    };

    const expectedCreatedOperation = expect.objectContaining({
      accountID: accountID01,
      amount,
      amountPerUnit,
      categoryID: categoryID01,
      comments,
      groupID: groupID01,
      type,
      unitCount,
      userID: userID01,
    });

    const expectedOperationCount = operations.length + 1;

    // when
    const createdOperation = await createOperation({ data, userID: userID01 });

    const actualOperationCount = (await readOperations({ userID: userID01 }))
      .length;

    // then
    expect(createdOperation).toEqual(expectedCreatedOperation);
    expect(actualOperationCount).toEqual(expectedOperationCount);
  });
});
