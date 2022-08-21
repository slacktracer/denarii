import { jest } from "@jest/globals";

import { operations, userID01 } from "../../../../data/data.js";
import { endConnections } from "../../../../functions/end-connections.js";

import * as mockPersistence from "../../../../mocks/persistence.js";

jest.unstable_mockModule(
  `../../../../../main/src/persistence/persistence.js`,
  () => mockPersistence,
);

const { prepareTestDatabase } = await import(
  "../../../../functions/prepare-test-database.js"
);

const { db, redisServer } = await import(
  `denarii/src/persistence/persistence.js`
);

const { readOperations } = await import(
  `denarii/src/core/modules/operations/operations.js`
);

let backup;

afterAll(async () => {
  await endConnections({ db, redisServer });
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
      (operation) => operation.userID === userID01,
    ).length;

    // when
    const actualOperations = await readOperations({ userID: userID01 });

    // then
    expect(actualOperations.length).toEqual(expectedOperationCount);
  });
});
