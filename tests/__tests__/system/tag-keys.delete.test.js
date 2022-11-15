import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

import { tagKeys, userPasswords, users } from "../../data/data.js";
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

const { tagKey03, tagKey04 } = tagKeys.$;

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

describe("DELETE /tags/keys", () => {
  test("the tagKey with the given ID is deleted", async () => {
    // given
    const user01TagKeyCount = tagKeys.filter(
      (tagKey) => tagKey.userID === user01.userID,
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
      .delete(`/tags/keys/${tagKey03.tagKeyID}`)
      .set("cookie", [secretCookie, sessionIDCookie]);

    const rows = inspectTable({
      table: "tag_key",
      template: { userID: user01.userID },
    });

    // then
    expect(response.status).toEqual(200);
    expect(response.body.deletedRowsCount).toEqual(expectedDeletedRowsCount);
    expect(rows.length).toEqual(user01TagKeyCount - 1);
  });

  describe("the tagKey does not belong to the given user or does not exist", () => {
    test("an error is returned, no tagKey is deleted", async () => {
      // given
      const user01TagKeyCount = tagKeys.length;

      const server = await getServer();

      const { secretCookie, sessionIDCookie } = await getSessionCookies({
        password: user01Password,
        server,
        username: user01.username,
      });

      // when
      const response = await server
        .delete(`/tags/keys/${tagKey04.tagKeyID}`)
        .set("cookie", [secretCookie, sessionIDCookie]);

      const rows = inspectTable({ table: "tag_key" });

      // then
      expect(response.status).toEqual(404);
      expect(rows.length).toEqual(user01TagKeyCount);
    });
  });
});
