import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

import { tagKeys, users } from "../../../../../data/data.js";
import * as mockConnect from "../../../../../mocks/persistence/connect.js";

jest.unstable_mockModule(
  `../../../../../../main/src/persistence/connect.js`,
  () => mockConnect,
);

const { tagKey01 } = tagKeys.$;
const { user01 } = users.$;

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
      tagKeyID: tagKey01.tagKeyID,
      name: newTagKeyName,
      userID: user01.userID,
    });

    const expectedTagKeyCount = tagKeys.filter(
      (tagKey) => tagKey.userID === user01.userID,
    ).length;

    // when
    const updatedTagKey = await updateTagKey({
      tagKeyID: tagKey01.tagKeyID,
      data: { name: newTagKeyName },
      userID: user01.userID,
    });

    const actualTagKeyCount = (await readTagKeys({ userID: user01.userID }))
      .length;

    // then
    expect(updatedTagKey).toEqual(expectedTagKey);
    expect(actualTagKeyCount).toEqual(expectedTagKeyCount);
  });
});
