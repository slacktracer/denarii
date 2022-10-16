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
  operations,
  tagKeys,
  tags,
  tagValues,
  users,
} from "../../../../../data/data.js";
import * as mockConnect from "../../../../../mocks/persistence/connect.js";

jest.unstable_mockModule(
  `../../../../../../main/src/persistence/connect.js`,
  () => mockConnect,
);

const { tagKey01 } = tagKeys.$;
const { tagValue01 } = tagValues.$;
const { operation01 } = operations.$;
const { user01 } = users.$;

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
      operationID: operation01.operationID,
      tagKeyID: tagKey01.tagKeyID,
      tagValueID: tagValue01.tagValueID,
      userID: user01.userID,
    };

    const expectedCreatedTag = expect.objectContaining(tagData);

    const expectedTagCount = tags.length + 1;

    // when
    const createdTag = await createTag({
      data: tagData,
      userID: user01.userID,
    });
    const actualTagCount = (await readTags({ userID: user01.userID })).length;

    // then
    expect(createdTag).toEqual(expectedCreatedTag);
    expect(actualTagCount).toEqual(expectedTagCount);
  });
});
