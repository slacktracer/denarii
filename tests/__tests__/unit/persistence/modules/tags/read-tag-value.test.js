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
  tags: { readTagValue },
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

describe("read tagValue", () => {
  test("an existing tagValue is returned", async () => {
    // given
    const expectedTagValue = expect.objectContaining({
      ...tagValue01,
      createdAt: new Date(tagValue01.createdAt),
    });

    // when
    const actualTagValue = await readTagValue({
      tagValueID: tagValue01.tagValueID,
      userID: user01.userID,
    });

    // then
    expect(actualTagValue).toEqual(expectedTagValue);
  });
});
