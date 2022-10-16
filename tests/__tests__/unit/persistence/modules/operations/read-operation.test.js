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

const { operation01 } = operations.$;
const { user01 } = users.$;

const { prepareTestDatabase } = await import(
  "../../../../../functions/prepare-test-database.js"
);

const { disconnect } = await import("../../../../../functions/disconnect.js");

const {
  operations: { readOperation },
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

describe("read operation", () => {
  test("an existing operation is returned", async () => {
    // given
    const expectedOperation = expect.objectContaining({
      ...operation01,
      at: new Date(operation01.at),
      createdAt: new Date(operation01.createdAt),
    });

    // when
    const actualOperation = await readOperation({
      operationID: operation01.operationID,
      userID: user01.userID,
    });

    // then
    expect(actualOperation).toEqual(expectedOperation);
  });
});
