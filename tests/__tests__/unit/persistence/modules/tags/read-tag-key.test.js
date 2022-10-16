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
  tags: { readTagKey },
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

describe("read tagKey", () => {
  test("an existing tagKey is returned", async () => {
    // given
    const expectedTagKey = expect.objectContaining({
      ...tagKey01,
      createdAt: new Date(tagKey01.createdAt),
    });

    // when
    const actualTagKey = await readTagKey({
      tagKeyID: tagKey01.tagKeyID,
      userID: user01.userID,
    });

    // then
    expect(actualTagKey).toEqual(expectedTagKey);
  });
});
