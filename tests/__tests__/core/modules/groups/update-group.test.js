import { jest } from "@jest/globals";

import { groupID01, groups, userID01 } from "../../../../data/data.js";
import { endConnections } from "../../../../functions/end-connections.js";

import * as mockPersistence from "../../../../mocks/persistence.js";

jest.unstable_mockModule(
  `../../../../../main/src/persistence/persistence.js`,
  () => mockPersistence,
);

const { prepareTestDatabase } = await import(
  "../../../../functions/prepare-test-database.js"
);

const { db, kv } = await import(`denarii/src/persistence/persistence.js`);

const { readGroups, updateGroup } = await import(
  `denarii/src/core/modules/groups/groups.js`
);

let backup;

afterAll(async () => {
  await endConnections({ db, kv });
});

beforeAll(async () => {
  backup = await prepareTestDatabase();
});

beforeEach(async () => {
  backup.restore();
});

describe("update group", () => {
  test("an existing group is updated", async () => {
    // given
    const newGroupName = "New Group Name!";

    const expectedGroup = expect.objectContaining({
      groupID: groupID01,
      name: newGroupName,
      userID: userID01,
    });

    const expectedGroupCount = groups.filter(
      (group) => group.userID === userID01,
    ).length;

    // when
    const updatedGroup = await updateGroup({
      groupID: groupID01,
      data: { name: newGroupName },
      userID: userID01,
    });

    const actualGroupCount = (await readGroups({ userID: userID01 })).length;

    // then
    expect(updatedGroup).toEqual(expectedGroup);
    expect(actualGroupCount).toEqual(expectedGroupCount);
  });
});
