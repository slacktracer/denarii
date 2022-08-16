import { jest } from "@jest/globals";

import { users } from "../../../../data/data.js";
import { endConnections } from "../../../../functions/end-connections.js";

import * as mockPersistence from "../../../../mocks/persistence.js";

jest.unstable_mockModule(
  `../../../../../main/src/persistence/persistence.js`,
  () => mockPersistence,
);

const { prepareTestDatabase } = await import(
  "../../../../functions/prepare-test-database.js"
);

const { db, kv } = await import(
  `../../../../../main/src/persistence/persistence.js`
);

const { createUser, readUsers } = await import(
  `../../../../../main/src/core/modules/users/users.js`
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

describe("create user", () => {
  test("a new user is created", async () => {
    // given
    const email = "thiago@example.com";
    const password = "Password1234!";
    const username = "thiago";

    const data = { email, password, username };

    const expectedCreatedUser = expect.objectContaining({ email, username });
    const expectedUserCount = users.length + 1;

    // when
    const createdUser = await createUser({ data });
    const userCount = (await readUsers()).length;

    // then
    expect(createdUser).toEqual(expectedCreatedUser);
    expect(userCount).toEqual(expectedUserCount);
  });
});
