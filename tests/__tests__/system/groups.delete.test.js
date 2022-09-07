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
  groupID01,
  groupID04,
  groupID05,
  groups,
  user01,
  user01Password,
  userID01,
} from "../../data/data.js";
import { getServer } from "../../functions/get-server.js";
import { getSessionIDCookie } from "../../functions/get-session-id-cookie.js";
import { inspectTable } from "../../functions/inspect-table.js";
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

describe("/DELETE groups", () => {
  describe("the group has no operations", () => {
    test("the group with the given ID is deleted", async () => {
      // given
      const user01GroupCount = groups.filter(
        (group) => group.userID === userID01,
      ).length;

      const server = await getServer();

      const sessionIDCookie = await getSessionIDCookie({
        password: user01Password,
        server,
        username: user01.username,
      });

      const expectedDeletedRowsCount = 1;

      // when
      const response = await server
        .delete(`/groups/${groupID04}`)
        .set("cookie", sessionIDCookie);

      const rows = inspectTable({
        table: "group",
        template: { userID: userID01 },
      });

      // then
      expect(response.status).toEqual(200);
      expect(response.body.deletedRowsCount).toEqual(expectedDeletedRowsCount);
      expect(rows.length).toEqual(user01GroupCount - 1);
    });

    describe("the group has operations", () => {
      test("an error is returned, the group is not deleted", async () => {
        // given
        const user01GroupCount = groups.filter(
          (group) => group.userID === userID01,
        ).length;

        const server = await getServer();

        const sessionIDCookie = await getSessionIDCookie({
          password: "1234",
          server,
          username: "mr.user",
        });

        // when
        const response = await server
          .delete(`/groups/${groupID01}`)
          .set("cookie", sessionIDCookie);

        const rows = inspectTable({
          table: "group",
          template: { userID: userID01 },
        });

        // then
        expect(response.status).toEqual(500);
        expect(rows.length).toEqual(user01GroupCount);
      });
    });

    describe("the group does not belong to the given user or does not exist", () => {
      test("an error is returned, no group is deleted", async () => {
        // given
        const user01GroupCount = groups.length;

        const server = await getServer();

        const sessionIDCookie = await getSessionIDCookie({
          password: "1234",
          server,
          username: "mr.user",
        });

        // when
        const response = await server
          .delete(`/groups/${groupID05}`)
          .set("cookie", sessionIDCookie);

        const rows = inspectTable({ table: "group" });

        // then
        expect(response.status).toEqual(404);
        expect(rows.length).toEqual(user01GroupCount);
      });
    });
  });
});