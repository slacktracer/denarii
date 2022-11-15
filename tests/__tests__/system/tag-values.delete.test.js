import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

import { tagValues, userPasswords, users } from "../../data/data.js";
import { getServer } from "../../functions/get-server.js";
import { getSessionCookies } from "../../functions/get-session-cookies.js";
import { inspectTable } from "../../functions/inspect-table.js";
import * as mockConnect from "../../mocks/persistence/connect.js";

jest.unstable_mockModule(
  `../../../main/src/persistence/connect.js`,
  () => mockConnect,
);

const { user01 } = users.$;
const { user01Password } = userPasswords.$;

const { tagValue05, tagValue06 } = tagValues.$;

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

describe("DELETE /tags/values", () => {
  test("the tagValue with the given ID is deleted", async () => {
    // given
    const user01TagValueCount = tagValues.filter(
      (tagValue) => tagValue.userID === user01.userID,
    ).length;

    const server = await getServer();

    const { secretCookie, sessionIDCookie } = await getSessionCookies({
      password: user01Password,
      server,
      username: user01.username,
    });

    const expectedDeletedRowsCount = 1;

    // when
    const response = await server
      .delete(`/tags/values/${tagValue05.tagValueID}`)
      .set("cookie", [secretCookie, sessionIDCookie]);

    const rows = inspectTable({
      table: "tag_value",
      template: { userID: user01.userID },
    });

    // then
    expect(response.status).toEqual(200);
    expect(response.body.deletedRowsCount).toEqual(expectedDeletedRowsCount);
    expect(rows.length).toEqual(user01TagValueCount - 1);
  });

  describe("the tagValue does not belong to the given user or does not exist", () => {
    test("an error is returned, no tagValue is deleted", async () => {
      // given
      const user01TagValueCount = tagValues.length;

      const server = await getServer();

      const { secretCookie, sessionIDCookie } = await getSessionCookies({
        password: user01Password,
        server,
        username: user01.username,
      });

      // when
      const response = await server
        .delete(`/tags/values/${tagValue06.tagValueID}`)
        .set("cookie", [secretCookie, sessionIDCookie]);

      const rows = inspectTable({ table: "tag_value" });

      // then
      expect(response.status).toEqual(404);
      expect(rows.length).toEqual(user01TagValueCount);
    });
  });
});
