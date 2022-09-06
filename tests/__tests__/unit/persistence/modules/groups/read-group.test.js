import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

import { group01, groupID01, userID01 } from "../../../../../data/data.js";
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
  groups: { readGroup },
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

describe("read group", () => {
  test("an existing group is returned", async () => {
    // given
    const expectedGroup = expect.objectContaining({
      ...group01,
      createdAt: new Date(group01.createdAt),
    });

    // when
    const actualGroup = await readGroup({
      groupID: groupID01,
      userID: userID01,
    });

    // then
    expect(actualGroup).toEqual(expectedGroup);
  });
});
