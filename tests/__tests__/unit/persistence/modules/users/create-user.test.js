import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

import { users } from "../../../../../data/data.js";
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
  users: { createUser, readUsers },
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
