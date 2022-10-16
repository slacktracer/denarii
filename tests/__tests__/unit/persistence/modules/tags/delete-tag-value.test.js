import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

import { tagValues, users } from "../../../../../data/data.js";
import * as mockConnect from "../../../../../mocks/persistence/connect.js";

jest.unstable_mockModule(
  `../../../../../../main/src/persistence/connect.js`,
  () => mockConnect,
);

const { tagValue05 } = tagValues.$;
const { user01 } = users.$;

const { prepareTestDatabase } = await import(
  "../../../../../functions/prepare-test-database.js"
);

const { disconnect } = await import("../../../../../functions/disconnect.js");

const {
  tags: { deleteTagValue, readTagValues },
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

describe("delete tagValue", () => {
  test("an existing tagValue is deleted", async () => {
    // given
    const expectedTagValueCount =
      tagValues.filter((tagValue) => tagValue.userID === user01.userID).length -
      1;

    // when
    await deleteTagValue({
      tagValueID: tagValue05.tagValueID,
      userID: user01.userID,
    });

    const actualTagValueCount = (await readTagValues({ userID: user01.userID }))
      .length;

    // then
    expect(actualTagValueCount).toEqual(expectedTagValueCount);
  });
});
