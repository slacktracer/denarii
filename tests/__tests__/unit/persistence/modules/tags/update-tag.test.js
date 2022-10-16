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
  tagID01,
  tags,
  tagValueID02,
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
  tags: { readTags, updateTag },
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

describe("update tag", () => {
  test("an existing tag is updated", async () => {
    // given
    const newTagValueID = tagValueID02;

    const expectedTag = expect.objectContaining({
      tagID: tagID01,
      tagValueID: newTagValueID,
      userID: userID01,
    });

    const expectedTagCount = tags.filter(
      (tag) => tag.userID === userID01,
    ).length;

    // when
    const updatedTag = await updateTag({
      tagID: tagID01,
      data: { tagValueID: newTagValueID },
      userID: userID01,
    });

    const actualTagCount = (await readTags({ userID: userID01 })).length;

    // then
    expect(updatedTag).toEqual(expectedTag);
    expect(actualTagCount).toEqual(expectedTagCount);
  });
});
