import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

import { groupID02, groups, userID01 } from "../../../../../data/data.js";
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

const { deleteGroup, readGroups } = await import(
  `denarii/src/persistence/modules/groups/groups.js`
);

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

describe("delete group", () => {
  test("an existing group is deleted", async () => {
    // given
    const expectedGroupCount =
      groups.filter((group) => group.userID === userID01).length - 1;

    // when
    await deleteGroup({ groupID: groupID02, userID: userID01 });
    const actualGroupCount = (await readGroups({ userID: userID01 })).length;

    // then
    expect(actualGroupCount).toEqual(expectedGroupCount);
  });
});
