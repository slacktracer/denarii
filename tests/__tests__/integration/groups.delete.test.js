import { describe, expect, test, vi } from "vitest";

import { NO_SUCH_GROUP } from "../../../main/src/domain/data/errors.js";
import { groups, userPasswords, users } from "../../data/data.js";
import { getServer } from "../../functions/get-server.js";
import { getSessionCookies } from "../../functions/get-session-cookies.js";
import * as mockConnect from "../../mocks/persistence/connect.js";

vi.mock(`../../../main/src/persistence/connect.js`, () => mockConnect);

const { user01 } = users.$;
const { user01Password } = userPasswords.$;

const { group01, group03 } = groups.$;

describe("DELETE /groups", () => {
  test("the group with the given ID is deleted", async () => {
    // given
    const expectedGroup = { ...group01, deleted: true };

    const server = await getServer();

    const { secretCookie, sessionIDCookie } = await getSessionCookies({
      password: user01Password,
      server,
      username: user01.username,
    });

    // when
    const response = await server
      .delete(`/groups/${group01.groupID}`)
      .set("cookie", [secretCookie, sessionIDCookie]);

    // then
    expect(response.status).toEqual(200);
    expect(response.body.deletedGroup).toEqual(expectedGroup);
  });

  describe("the group does not belong to the given user or does not exist", () => {
    test("an error is returned, no group is deleted", async () => {
      // given
      const server = await getServer();

      const { secretCookie, sessionIDCookie } = await getSessionCookies({
        password: user01Password,
        server,
        username: user01.username,
      });

      const expectedResponseBody = { message: NO_SUCH_GROUP.description };

      // when
      const response = await server
        .delete(`/groups/${group03.groupID}`)
        .set("cookie", [secretCookie, sessionIDCookie]);

      // then
      expect(response.status).toEqual(404);
      expect(response.body).toEqual(expectedResponseBody);
    });
  });
});
