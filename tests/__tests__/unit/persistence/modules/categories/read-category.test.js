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
  category01,
  categoryID01,
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

const { readCategory } = await import(
  `denarii/src/persistence/modules/categories/categories.js`
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

describe("read category", () => {
  test("an existing category is returned", async () => {
    // given
    const expectedCategory = expect.objectContaining({
      ...category01,
      createdAt: new Date(category01.createdAt),
    });

    // when
    const actualCategory = await readCategory({
      categoryID: categoryID01,
      userID: userID01,
    });

    // then
    expect(actualCategory).toEqual(expectedCategory);
  });
});
