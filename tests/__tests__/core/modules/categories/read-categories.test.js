import { jest } from "@jest/globals";

import { categories, userID01 } from "../../../../data/data.js";
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

const { readCategories } = await import(
  `../../../../../main/src/core/modules/categories/categories.js`
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