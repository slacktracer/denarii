import { jest } from "@jest/globals";

import { group01, groupID01, userID01 } from "../../../../data/data.js";
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

const { readGroup } = await import(`denarii/src/core/modules/groups/groups.js`);

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

describe("read group", () => {
  test("an existing group is returned", async () => {
    // given
    const expectedGroup = expect.objectContaining({
      ...group01,
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
