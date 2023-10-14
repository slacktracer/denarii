import { describe, expect, test, vi } from "vitest";

import { groups, userPasswords, users } from "../../data/data.js";
import { getServer } from "../../functions/get-server.js";
import { getSessionCookies } from "../../functions/get-session-cookies.js";
import * as mockConnect from "../../mocks/persistence/connect.js";

vi.mock(`../../../main/src/persistence/connect.js`, () => mockConnect);

const { user01 } = users.$;
const { user01Password } = userPasswords.$;

const { group01, group03 } = groups.$;

describe("GET /groups", () => {
  test("it returns all the given user groups", async () => {
    // given
    const server = await getServer();

    const expectedGroups = expect.arrayContaining(
      groups
        .map((group) => Object.assign({}, group))
        .filter((group) => group.userID === user01.userID)
        .map((group) => {
          group.updatedAt = null;

          return group;
        }),
    );

    const { secretCookie, sessionIDCookie } = await getSessionCookies({
      password: user01Password,
      server,
      username: user01.username,
    });

    // when
    const response = await server
      .get("/groups")
      .set("cookie", [secretCookie, sessionIDCookie]);

    // then
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expectedGroups);
  });

  describe("a group ID was given", () => {
    test("it returns just the group with the given ID", async () => {
      // given
      const server = await getServer();

      const expectedGroup = expect.objectContaining(group01);

      const { secretCookie, sessionIDCookie } = await getSessionCookies({
        password: user01Password,
        server,
        username: user01.username,
      });

      // when
      const response = await server
        .get(`/groups/${group01.groupID}`)
        .set("cookie", [secretCookie, sessionIDCookie]);

      // then
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(expectedGroup);
    });

    describe("the given group does not belong to the session user", () => {
      test("it returns null", async () => {
        // given
        const server = await getServer();

        const expectedGroup = null;

        const { secretCookie, sessionIDCookie } = await getSessionCookies({
          password: user01Password,
          server,
          username: user01.username,
        });

        // when
        const response = await server
          .get(`/groups/${group03.groupID}`)
          .set("cookie", [secretCookie, sessionIDCookie]);

        // then
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(expectedGroup);
      });
    });
  });
});
