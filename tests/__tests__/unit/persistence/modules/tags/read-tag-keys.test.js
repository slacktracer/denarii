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

const { user01 } = users.$;

const { prepareTestDatabase } = await import(
  "../../../../../functions/prepare-test-database.js"
);

const { disconnect } = await import("../../../../../functions/disconnect.js");

const {
  tags: { readTagKeys },
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

describe("read tagKeys", () => {
  test("all existing tagKeys for the given user are returned", async () => {
    // given
    const expectedTagKeyCount = tagKeys.filter(
      (tagKey) => tagKey.userID === user01.userID,
    ).length;

    // when
    const actualTagKeys = await readTagKeys({ userID: user01.userID });

    // then
    expect(actualTagKeys.length).toEqual(expectedTagKeyCount);
  });
});
