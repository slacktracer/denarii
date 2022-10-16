import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

import { tagKey01, tagKeyID01, userID01 } from "../../../../../data/data.js";
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
      tagKeyID: tagKeyID01,
      userID: userID01,
    });

    // then
    expect(actualTagKey).toEqual(expectedTagKey);
  });
});
