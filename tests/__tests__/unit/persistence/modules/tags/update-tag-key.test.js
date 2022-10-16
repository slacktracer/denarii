import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

import { tagKeyID01, tagKeys, userID01 } from "../../../../../data/data.js";
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
  tags: { readTagKeys, updateTagKey },
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

describe("update tagKey", () => {
  test("an existing tagKey is updated", async () => {
    // given
    const newTagKeyName = "New TagKey Name!";

    const expectedTagKey = expect.objectContaining({
      tagKeyID: tagKeyID01,
      name: newTagKeyName,
      userID: userID01,
    });

    const expectedTagKeyCount = tagKeys.filter(
      (tagKey) => tagKey.userID === userID01,
    ).length;

    // when
    const updatedTagKey = await updateTagKey({
      tagKeyID: tagKeyID01,
      data: { name: newTagKeyName },
      userID: userID01,
    });

    const actualTagKeyCount = (await readTagKeys({ userID: userID01 })).length;

    // then
    expect(updatedTagKey).toEqual(expectedTagKey);
    expect(actualTagKeyCount).toEqual(expectedTagKeyCount);
  });
});
