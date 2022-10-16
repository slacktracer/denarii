import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

import { tagValues, userID01 } from "../../../../../data/data.js";
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
  tags: { createTagValue, readTagValues },
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

describe("create tagValue", () => {
  test("a new tagValue is created", async () => {
    // given
    const name = "TagValue!";

    const tagValueData = { name, userID: userID01 };

    const expectedCreatedTagValue = expect.objectContaining({
      name,
      userID: userID01,
    });

    const expectedTagValueCount = tagValues.length + 1;

    // when
    const createdTagValue = await createTagValue({
      data: tagValueData,
      userID: userID01,
    });
    const actualTagValueCount = (await readTagValues({ userID: userID01 }))
      .length;

    // then
    expect(createdTagValue).toEqual(expectedCreatedTagValue);
    expect(actualTagValueCount).toEqual(expectedTagValueCount);
  });
});
