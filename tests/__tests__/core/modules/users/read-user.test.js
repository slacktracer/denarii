import { jest } from "@jest/globals";

import { user01, userID01 } from "../../../../data/data.js";
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

const { readUser } = await import(`denarii/src/core/modules/users/users.js`);

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

describe("read user", () => {
  it("returns the user with the specified user ID", async () => {
    // given
    const expectedUser = expect.objectContaining({
      email: user01.email,
      username: user01.username,
    });

    // when
    const actualUser = await readUser({ userID: userID01 });

    // then
    expect(actualUser).toEqual(expectedUser);
  });
});
