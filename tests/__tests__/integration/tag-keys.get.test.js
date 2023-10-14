import { describe, expect, test, vi } from "vitest";

import { tagKeys, userPasswords, users } from "../../data/data.js";
import { getServer } from "../../functions/get-server.js";
import { getSessionCookies } from "../../functions/get-session-cookies.js";
import * as mockConnect from "../../mocks/persistence/connect.js";

vi.mock(`../../../main/src/persistence/connect.js`, () => mockConnect);

const { user01 } = users.$;
const { user01Password } = userPasswords.$;

const { tagKey01, tagKey04 } = tagKeys.$;

describe("GET /tags/keys", () => {
  test("it returns all the given user tagKeys", async () => {
    // given
    const server = await getServer();

    const expectedTagKeys = expect.arrayContaining(
      tagKeys
        .map((tagKey) => Object.assign({}, tagKey))
        .filter((tagKey) => tagKey.userID === user01.userID)
        .map((tagKey) => {
          tagKey.updatedAt = null;

          return tagKey;
        }),
    );

    const { secretCookie, sessionIDCookie } = await getSessionCookies({
      password: user01Password,
      server,
      username: user01.username,
    });

    // when
    const response = await server
      .get("/tags/keys")
      .set("cookie", [secretCookie, sessionIDCookie]);

    // then
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expectedTagKeys);
  });

  describe("a tagKey ID was given", () => {
    test("it returns just the tagKey with the given ID", async () => {
      // given
      const server = await getServer();

      const expectedTagKey = expect.objectContaining(tagKey01);

      const { secretCookie, sessionIDCookie } = await getSessionCookies({
        password: user01Password,
        server,
        username: user01.username,
      });

      // when
      const response = await server
        .get(`/tags/keys/${tagKey01.tagKeyID}`)
        .set("cookie", [secretCookie, sessionIDCookie]);

      // then
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(expectedTagKey);
    });

    describe("the given tagKey does not belong to the session user", () => {
      test("it returns null", async () => {
        // given
        const server = await getServer();

        const expectedTagKey = null;

        const { secretCookie, sessionIDCookie } = await getSessionCookies({
          password: user01Password,
          server,
          username: user01.username,
        });

        // when
        const response = await server
          .get(`/tags/keys/${tagKey04.tagKeyID}`)
          .set("cookie", [secretCookie, sessionIDCookie]);

        // then
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(expectedTagKey);
      });
    });
  });
});
