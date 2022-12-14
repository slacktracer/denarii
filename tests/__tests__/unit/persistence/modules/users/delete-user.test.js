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

const { user03 } = users.$;

const { prepareTestDatabase } = await import(
  "../../../../../functions/prepare-test-database.js"
);

const { disconnect } = await import("../../../../../functions/disconnect.js");

const {
  users: { deleteUser, readUsers },
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

describe("delete user", () => {
  test("an existing user is deleted", async () => {
    // given
    const expectedUserCount = users.length - 1;

    // when
    await deleteUser({ userID: user03.userID });
    const actualUserCount = (await readUsers()).length;

    // then
    expect(actualUserCount).toEqual(expectedUserCount);
  });
});
