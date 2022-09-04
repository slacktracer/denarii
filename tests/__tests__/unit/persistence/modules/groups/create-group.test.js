import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

import { groups, userID01 } from "../../../../../data/data.js";
import { endConnections } from "../../../../../functions/end-connections.js";

import * as mockConnect from "../../../../../mocks/persistence/connect.js";

jest.unstable_mockModule(
  `../../../../../../main/src/persistence/connect.js`,
  () => mockConnect,
);

const { prepareTestDatabase } = await import(
  "../../../../../functions/prepare-test-database.js"
);

const { db, legacyRedisClient, redisServer } = await import(
  `denarii/src/persistence/persistence.js`
);

const {
  groups: { createGroup, readGroups },
} = await import(`denarii/src/persistence/modules/groups/groups.js`);

let backup;

afterAll(async () => {
  await endConnections({ db, legacyRedisClient, redisServer });
});

beforeAll(async () => {
  backup = await prepareTestDatabase();
});

beforeEach(async () => {
  backup.restore();
});

describe("create group", () => {
  test("a new group is created", async () => {
    // given
    const name = "Group!";

    const groupData = { name, userID: userID01 };

    const expectedCreatedGroup = expect.objectContaining({
      name,
      userID: userID01,
    });

    const expectedGroupCount = groups.length + 1;

    // when
    const createdGroup = await createGroup({
      data: groupData,
      userID: userID01,
    });
    const actualGroupCount = (await readGroups({ userID: userID01 })).length;

    // then
    expect(createdGroup).toEqual(expectedCreatedGroup);
    expect(actualGroupCount).toEqual(expectedGroupCount);
  });
});
