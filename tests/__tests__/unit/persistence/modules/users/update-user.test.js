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

const { user01 } = users.$;

const { prepareTestDatabase } = await import(
  "../../../../../functions/prepare-test-database.js"
);

const { disconnect } = await import("../../../../../functions/disconnect.js");

const {
  users: { readUsers, updateUser },
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

describe("update user", () => {
  test("an existing user is updated", async () => {
    // given
    const newUserUsername = "lorena";

    const expectedUser = expect.objectContaining({
      username: newUserUsername,
      userID: user01.userID,
    });

    const expectedUserCount = users.length;

    // when
    const updatedUser = await updateUser({
      data: { username: newUserUsername, userID: user01.userID },
    });
    const actualUserCount = (await readUsers()).length;

    // then
    expect(updatedUser).toEqual(expectedUser);
    expect(actualUserCount).toEqual(expectedUserCount);
  });
});
