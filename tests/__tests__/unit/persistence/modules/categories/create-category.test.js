import { jest } from "@jest/globals";

import { categories, groupID01, userID01 } from "../../../../../data/data.js";
import { endConnections } from "../../../../../functions/end-connections.js";

import * as mockConnect from "../../../../../mocks/persistence/connect.js";

jest.unstable_mockModule(
  `../../../../../../main/src/persistence/connect.js`,
  () => mockConnect,
);

const { prepareTestDatabase } = await import(
  "../../../../../functions/prepare-test-database.js"
);

const { db, redisServer } = await import(
  `denarii/src/persistence/persistence.js`
);

const { createCategory, readCategories } = await import(
  `denarii/src/persistence/modules/categories/categories.js`
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

describe("create category", () => {
  test("a new category is created", async () => {
    // given
    const name = "Category!";

    const categoryData = { groupID: groupID01, name, userID: userID01 };

    const expectedCreatedCategory = expect.objectContaining({
      groupID: groupID01,
      name,
      userID: userID01,
    });

    const expectedCategoryCount = categories.length + 1;

    // when
    const createdCategory = await createCategory({
      data: categoryData,
      userID: userID01,
    });

    const actualCategoryCount = (await readCategories({ userID: userID01 }))
      .length;

    // then
    expect(createdCategory).toEqual(expectedCreatedCategory);
    expect(actualCategoryCount).toEqual(expectedCategoryCount);
  });
});
