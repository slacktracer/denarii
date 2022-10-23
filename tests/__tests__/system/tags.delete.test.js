import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

import { tags, userPasswords, users } from "../../data/data.js";
import { getServer } from "../../functions/get-server.js";
import { getSessionIDCookie } from "../../functions/get-session-id-cookie.js";
import { inspectTable } from "../../functions/inspect-table.js";
import * as mockConnect from "../../mocks/persistence/connect.js";

jest.unstable_mockModule(
  `../../../main/src/persistence/connect.js`,
  () => mockConnect,
);

const { user01 } = users.$;
const { user01Password } = userPasswords.$;

const { tag05, tag06 } = tags.$;

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

describe("DELETE /tags", () => {
  test("the tag with the given ID is deleted", async () => {
    // given
    const user01TagCount = tags.filter(
      (tag) => tag.userID === user01.userID,
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
      .delete(`/tags/${tag05.tagID}`)
      .set("cookie", sessionIDCookie);

    const rows = inspectTable({
      table: "tag",
      template: { userID: user01.userID },
    });

    // then
    expect(response.status).toEqual(200);
    expect(response.body.deletedRowsCount).toEqual(expectedDeletedRowsCount);
    expect(rows.length).toEqual(user01TagCount - 1);
  });

  describe("the tag does not belong to the given user or does not exist", () => {
    test("an error is returned, no tag is deleted", async () => {
      // given
      const user01TagCount = tags.length;

      const server = await getServer();

      const sessionIDCookie = await getSessionIDCookie({
        password: user01Password,
        server,
        username: user01.username,
      });

      // when
      const response = await server
        .delete(`/tags/${tag06.tagID}`)
        .set("cookie", sessionIDCookie);

      const rows = inspectTable({ table: "tag" });

      // then
      expect(response.status).toEqual(404);
      expect(rows.length).toEqual(user01TagCount);
    });
  });
});
