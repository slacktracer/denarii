import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

import { tagValueID01, tagValues, userID01 } from "../../../../../data/data.js";
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
      tagValueID: tagValueID01,
      name: newTagValueName,
      userID: userID01,
    });

    const expectedTagValueCount = tagValues.filter(
      (tagValue) => tagValue.userID === userID01,
    ).length;

    // when
    const updatedTagValue = await updateTagValue({
      tagValueID: tagValueID01,
      data: { name: newTagValueName },
      userID: userID01,
    });

    const actualTagValueCount = (await readTagValues({ userID: userID01 }))
      .length;

    // then
    expect(updatedTagValue).toEqual(expectedTagValue);
    expect(actualTagValueCount).toEqual(expectedTagValueCount);
  });
});
