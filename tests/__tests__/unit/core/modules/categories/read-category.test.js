import { jest } from "@jest/globals";

import {
  category01,
  categoryID01,
  userID01,
} from "../../../../../data/data.js";
import { endConnections } from "../../../../../functions/end-connections.js";

import * as mockPersistence from "../../../../../mocks/persistence.js";

jest.unstable_mockModule(
  `../../../../../../main/src/persistence/persistence.js`,
  () => mockPersistence,
);

const { prepareTestDatabase } = await import(
  "../../../../../functions/prepare-test-database.js"
);

const { db, redisServer } = await import(
  `denarii/src/persistence/persistence.js`
);

const { readCategory } = await import(
  `denarii/src/core/modules/categories/categories.js`
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

describe("read category", () => {
  test("an existing category is returned", async () => {
    // given
    const expectedCategory = expect.objectContaining({
      ...category01,
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
