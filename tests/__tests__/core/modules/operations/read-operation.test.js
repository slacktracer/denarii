import { jest } from "@jest/globals";

import { operation01, operationID01, userID01 } from "../../../../data/data.js";
import { endConnections } from "../../../../functions/end-connections.js";

import * as mockPersistence from "../../../../mocks/persistence.js";

jest.unstable_mockModule(
  `../../../../../main/src/persistence/persistence.js`,
  () => mockPersistence,
);

const { prepareTestDatabase } = await import(
  "../../../../functions/prepare-test-database.js"
);

const { db, kv } = await import(
  `../../../../../main/src/persistence/persistence.js`
);

const { readOperation } = await import(
  `../../../../../main/src/core/modules/operations/operations.js`
);

let backup;

afterAll(async () => {
  await endConnections({ db, kv });
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
    });

    // when
    const actualOperation = await readOperation({
      operationID: operationID01,
      userID: userID01,
    });

    // then
    expect(actualOperation).toEqual(expectedOperation);
  });
});
