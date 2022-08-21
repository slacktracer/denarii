import { jest } from "@jest/globals";

import { groups, userID01 } from "../../../../../data/data.js";
import { endConnections } from "../../../../../functions/end-connections.js";

import * as mockPersistence from "../../../../../mocks/persistence.js";

jest.unstable_mockModule(
  `../../../../../../main/src/persistence/persistence.js`,
  () => mockPersistence,
);

const { prepareTestDatabase } = await import(
  "../../../../../functions/prepare-test-database.js"
);

const { db, redisServer } = await import(
  `denarii/src/persistence/persistence.js`
);

const { readGroups } = await import(
  `denarii/src/core/modules/groups/groups.js`
);

let backup;

afterAll(async () => {
  await endConnections({ db, redisServer });
});

beforeAll(async () => {
  backup = await prepareTestDatabase();
});

beforeEach(async () => {
  backup.restore();
});

describe("read groups", () => {
  test("all existing groups for the given user are returned", async () => {
    // given
    const expectedGroupCount = groups.filter(
      (group) => group.userID === userID01,
    ).length;

    // when
    const actualGroups = await readGroups({ userID: userID01 });

    // then
    expect(actualGroups.length).toEqual(expectedGroupCount);
  });
});
