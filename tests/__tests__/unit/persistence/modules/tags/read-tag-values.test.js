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
  tags: { readTagValues },
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

describe("read tagValues", () => {
  test("all existing tagValues for the given user are returned", async () => {
    // given
    const expectedTagValueCount = tagValues.filter(
      (tagValue) => tagValue.userID === userID01,
    ).length;

    // when
    const actualTagValues = await readTagValues({ userID: userID01 });

    // then
    expect(actualTagValues.length).toEqual(expectedTagValueCount);
  });
});
