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

const { prepareTestDatabase } = await import(
  "../../../../../functions/prepare-test-database.js"
);

const { disconnect } = await import("../../../../../functions/disconnect.js");

const {
  operations: { readOperations },
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

describe("read operations", () => {
  test("all existing operations for the given user are returned", async () => {
    // given
    const expectedOperationCount = operations.filter(
      (operation) => operation.userID === user01.userID,
    ).length;

    // when
    const actualOperations = await readOperations({ userID: user01.userID });

    // then
    expect(actualOperations.length).toEqual(expectedOperationCount);
  });
});
