import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

import { tagKeyID03, tagKeys, userID01 } from "../../../../../data/data.js";
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
  tags: { deleteTagKey, readTagKeys },
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

describe("delete tagKey", () => {
  test("an existing tagKey is deleted", async () => {
    // given
    const expectedTagKeyCount =
      tagKeys.filter((tagKey) => tagKey.userID === userID01).length - 1;

    // when
    await deleteTagKey({ tagKeyID: tagKeyID03, userID: userID01 });
    const actualTagKeyCount = (await readTagKeys({ userID: userID01 })).length;

    // then
    expect(actualTagKeyCount).toEqual(expectedTagKeyCount);
  });
});
