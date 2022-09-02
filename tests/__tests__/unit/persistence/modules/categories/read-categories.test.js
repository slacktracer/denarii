import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

import { categories, userID01 } from "../../../../../data/data.js";
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

const { readCategories } = await import(
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

describe("read categories", () => {
  test("all existing categories for the given user are returned", async () => {
    // given
    const expectedCategoryCount = categories.filter(
      (category) => category.userID === userID01,
    ).length;

    // when
    const actualCategories = await readCategories({ userID: userID01 });

    // then
    expect(actualCategories.length).toEqual(expectedCategoryCount);
  });
});
