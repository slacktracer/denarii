import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

import { user01, user01Password } from "../../data/data.js";
import { getServer } from "../../functions/get-server.js";
import { getSessionIDCookie } from "../../functions/get-session-id-cookie.js";
import * as mockConnect from "../../mocks/persistence/connect.js";

jest.unstable_mockModule(
  `../../../main/src/persistence/connect.js`,
  () => mockConnect,
);

const { prepareTestDatabase } = await import(
  "../../functions/prepare-test-database.js"
);

const { disconnect } = await import("../../functions/disconnect.js");

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

describe("POST /groups", () => {
  test("a new group is created and returned", async () => {
    // given
    const server = await getServer();

    const name = "New Group!";

    const expectedGroup = expect.objectContaining({ name });

    const sessionIDCookie = await getSessionIDCookie({
      password: user01Password,
      server,
      username: user01.username,
    });

    // when
    const response = await server
      .post("/groups")
      .send({ name })
      .set("cookie", sessionIDCookie);

    // then
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expectedGroup);
  });
});
