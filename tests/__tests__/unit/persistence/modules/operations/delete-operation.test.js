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
  operationID02,
  operations,
  userID01,
} from "../../../../../data/data.js";
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
  operations: { deleteOperation, readOperations },
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

describe("delete operation", () => {
  test("an existing operation is deleted", async () => {
    // given
    const expectedOperationCount =
      operations.filter((operation) => operation.userID === userID01).length -
      1;

    // when
    await deleteOperation({ operationID: operationID02, userID: userID01 });
    const actualOperationCount = (await readOperations({ userID: userID01 }))
      .length;

    // then
    expect(actualOperationCount).toEqual(expectedOperationCount);
  });
});
