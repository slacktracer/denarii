import { jest } from "@jest/globals";

import { userID03, users } from "../../../../data/data.js";
import { endConnections } from "../../../../functions/end-connections.js";

import * as mockPersistence from "../../../../mocks/persistence.js";

jest.unstable_mockModule(
  `../../../../../main/src/persistence/persistence.js`,
  () => mockPersistence,
);

const { prepareTestDatabase } = await import(
  "../../../../functions/prepare-test-database.js"
);

const { db, redisServer } = await import(
  `denarii/src/persistence/persistence.js`
);

const { deleteUser, readUsers } = await import(
  `denarii/src/core/modules/users/users.js`
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

describe("delete user", () => {
  test("an existing user is deleted", async () => {
    // given
    const expectedUserCount = users.length - 1;

    // when
    await deleteUser({ userID: userID03 });
    const actualUserCount = (await readUsers()).length;

    // then
    expect(actualUserCount).toEqual(expectedUserCount);
  });
});
