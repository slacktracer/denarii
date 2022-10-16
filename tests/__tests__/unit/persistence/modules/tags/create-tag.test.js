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
  operationID01,
  tagKeyID01,
  tags,
  tagValueID01,
  userID01,
} from "../../../../../data/data.js";
import * as mockConnect from "../../../../../mocks/persistence/connect.js";

jest.unstable_mockModule(
  `../../../../../../main/src/persistence/connect.js`,
  () => mockConnect,
);

const { prepareTestDatabase } = await import(
  "../../../../../functions/prepare-test-database.js"
);

const { disconnect } = await import("../../../../../functions/disconnect.js");

const {
  tags: { createTag, readTags },
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

describe("create tag", () => {
  test("a new tag is created", async () => {
    // given
    const tagData = {
      operationID: operationID01,
      tagKeyID: tagKeyID01,
      tagValueID: tagValueID01,
      userID: userID01,
    };

    const expectedCreatedTag = expect.objectContaining(tagData);

    const expectedTagCount = tags.length + 1;

    // when
    const createdTag = await createTag({
      data: tagData,
      userID: userID01,
    });
    const actualTagCount = (await readTags({ userID: userID01 })).length;

    // then
    expect(createdTag).toEqual(expectedCreatedTag);
    expect(actualTagCount).toEqual(expectedTagCount);
  });
});
