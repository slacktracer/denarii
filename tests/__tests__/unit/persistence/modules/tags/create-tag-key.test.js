import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

import { tagKeys, userID01 } from "../../../../../data/data.js";
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
  tags: { createTagKey, readTagKeys },
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

describe("create tagKey", () => {
  test("a new tagKey is created", async () => {
    // given
    const name = "TagKey!";

    const tagKeyData = { name, userID: userID01 };

    const expectedCreatedTagKey = expect.objectContaining({
      name,
      userID: userID01,
    });

    const expectedTagKeyCount = tagKeys.length + 1;

    // when
    const createdTagKey = await createTagKey({
      data: tagKeyData,
      userID: userID01,
    });
    const actualTagKeyCount = (await readTagKeys({ userID: userID01 })).length;

    // then
    expect(createdTagKey).toEqual(expectedCreatedTagKey);
    expect(actualTagKeyCount).toEqual(expectedTagKeyCount);
  });
});
