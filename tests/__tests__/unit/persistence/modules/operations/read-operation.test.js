import { jest } from "@jest/globals";

import {
  operation01,
  operationID01,
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

const { readOperation } = await import(
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
      operationID: operationID01,
      userID: userID01,
    });

    // then
    expect(actualOperation).toEqual(expectedOperation);
  });
});
