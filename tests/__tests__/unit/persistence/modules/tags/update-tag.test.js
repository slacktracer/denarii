import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

import { tags, tagValues, users } from "../../../../../data/data.js";
import * as mockConnect from "../../../../../mocks/persistence/connect.js";

jest.unstable_mockModule(
  `../../../../../../main/src/persistence/connect.js`,
  () => mockConnect,
);

const { tag01 } = tags.$;
const { tagValue02 } = tagValues.$;
const { user01 } = users.$;

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
    const newTagValueID = tagValue02.tagValueID;

    const expectedTag = expect.objectContaining({
      tagID: tag01.tagID,
      tagValueID: newTagValueID,
      userID: user01.userID,
    });

    const expectedTagCount = tags.filter(
      (tag) => tag.userID === user01.userID,
    ).length;

    // when
    const updatedTag = await updateTag({
      tagID: tag01.tagID,
      data: { tagValueID: newTagValueID },
      userID: user01.userID,
    });

    const actualTagCount = (await readTags({ userID: user01.userID })).length;

    // then
    expect(updatedTag).toEqual(expectedTag);
    expect(actualTagCount).toEqual(expectedTagCount);
  });
});
