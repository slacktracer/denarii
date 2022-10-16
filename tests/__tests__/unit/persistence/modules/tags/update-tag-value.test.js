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

const { tagValue01 } = tagValues.$;
const { user01 } = users.$;

const { prepareTestDatabase } = await import(
  "../../../../../functions/prepare-test-database.js"
);

const { disconnect } = await import("../../../../../functions/disconnect.js");

const {
  tags: { readTagValues, updateTagValue },
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

describe("update tagValue", () => {
  test("an existing tagValue is updated", async () => {
    // given
    const newTagValueName = "New TagValue Name!";

    const expectedTagValue = expect.objectContaining({
      tagValueID: tagValue01.tagValueID,
      name: newTagValueName,
      userID: user01.userID,
    });

    const expectedTagValueCount = tagValues.filter(
      (tagValue) => tagValue.userID === user01.userID,
    ).length;

    // when
    const updatedTagValue = await updateTagValue({
      tagValueID: tagValue01.tagValueID,
      data: { name: newTagValueName },
      userID: user01.userID,
    });

    const actualTagValueCount = (await readTagValues({ userID: user01.userID }))
      .length;

    // then
    expect(updatedTagValue).toEqual(expectedTagValue);
    expect(actualTagValueCount).toEqual(expectedTagValueCount);
  });
});
