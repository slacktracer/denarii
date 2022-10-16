import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

import { tags, users } from "../../../../../data/data.js";
import * as mockConnect from "../../../../../mocks/persistence/connect.js";

jest.unstable_mockModule(
  `../../../../../../main/src/persistence/connect.js`,
  () => mockConnect,
);

const { tag05 } = tags.$;
const { user01 } = users.$;

const { prepareTestDatabase } = await import(
  "../../../../../functions/prepare-test-database.js"
);

const { disconnect } = await import("../../../../../functions/disconnect.js");

const {
  tags: { deleteTag, readTags },
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

describe("delete tag", () => {
  test("an existing tag is deleted", async () => {
    // given
    const expectedTagCount =
      tags.filter((tag) => tag.userID === user01.userID).length - 1;

    // when
    await deleteTag({ tagID: tag05.tagID, userID: user01.userID });
    const actualTagCount = (await readTags({ userID: user01.userID })).length;

    // then
    expect(actualTagCount).toEqual(expectedTagCount);
  });
});
