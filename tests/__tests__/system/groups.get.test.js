import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

import {
  group01,
  groupID01,
  groupID05,
  groups,
  user01,
  user01Password,
  userID01,
} from "../../data/data.js";
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

describe("GET /groups", () => {
  test("it returns all the given user groups", async () => {
    // given
    const server = await getServer();

    const expectedGroups = groups
      .filter((group) => group.userID === userID01)
      .map((group) => {
        group.updatedAt = null;

        return group;
      });

    const sessionIDCookie = await getSessionIDCookie({
      password: user01Password,
      server,
      username: user01.username,
    });

    // when
    const response = await server.get("/groups").set("cookie", sessionIDCookie);

    // then
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expectedGroups);
  });

  describe("group ID was given", () => {
    test("it returns just the group with the given ID", async () => {
      // given
      const server = await getServer();

      const expectedGroup = expect.objectContaining(group01);

      const sessionIDCookie = await getSessionIDCookie({
        password: "1234",
        server,
        username: "mr.user",
      });

      // when
      const response = await server
        .get(`/groups/${groupID01}`)
        .set("cookie", sessionIDCookie);

      // then
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(expectedGroup);
    });

    describe("the given group does not belong to the session user", () => {
      test("it returns null", async () => {
        // given
        const server = await getServer();

        const expectedGroup = null;

        const sessionIDCookie = await getSessionIDCookie({
          password: "1234",
          server,
          username: "mr.user",
        });

        // when
        const response = await server
          .get(`/groups/${groupID05}`)
          .set("cookie", sessionIDCookie);

        // then
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(expectedGroup);
      });
    });
  });
});
