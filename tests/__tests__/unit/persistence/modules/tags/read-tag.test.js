import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

import { tag01, tagID01, userID01 } from "../../../../../data/data.js";
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
  tags: { readTag },
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

describe("read tag", () => {
  test("an existing tag is returned", async () => {
    // given
    const expectedTag = expect.objectContaining({
      ...tag01,
      createdAt: new Date(tag01.createdAt),
    });

    // when
    const actualTag = await readTag({
      tagID: tagID01,
      userID: userID01,
    });

    // then
    expect(actualTag).toEqual(expectedTag);
  });
});
