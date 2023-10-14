import { describe, expect, test, vi } from "vitest";

import { tagValues, userPasswords, users } from "../../data/data.js";
import { getServer } from "../../functions/get-server.js";
import { getSessionCookies } from "../../functions/get-session-cookies.js";
import * as mockConnect from "../../mocks/persistence/connect.js";

vi.mock(`../../../main/src/persistence/connect.js`, () => mockConnect);

const { user01 } = users.$;
const { user01Password } = userPasswords.$;

const { tagValue01, tagValue06 } = tagValues.$;

describe("GET /tags/values", () => {
  test("it returns all the given user tagValues", async () => {
    // given
    const server = await getServer();

    const expectedTagValues = expect.arrayContaining(
      tagValues
        .map((tagValue) => Object.assign({}, tagValue))
        .filter((tagValue) => tagValue.userID === user01.userID)
        .map((tagValue) => {
          tagValue.updatedAt = null;

          return tagValue;
        }),
    );

    const { secretCookie, sessionIDCookie } = await getSessionCookies({
      password: user01Password,
      server,
      username: user01.username,
    });

    // when
    const response = await server
      .get("/tags/values")
      .set("cookie", [secretCookie, sessionIDCookie]);

    // then
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expectedTagValues);
  });

  describe("a tagValue ID was given", () => {
    test("it returns just the tagValue with the given ID", async () => {
      // given
      const server = await getServer();

      const expectedTagValue = expect.objectContaining(tagValue01);

      const { secretCookie, sessionIDCookie } = await getSessionCookies({
        password: user01Password,
        server,
        username: user01.username,
      });

      // when
      const response = await server
        .get(`/tags/values/${tagValue01.tagValueID}`)
        .set("cookie", [secretCookie, sessionIDCookie]);

      // then
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(expectedTagValue);
    });

    describe("the given tagValue does not belong to the session user", () => {
      test("it returns null", async () => {
        // given
        const server = await getServer();

        const expectedTagValue = null;

        const { secretCookie, sessionIDCookie } = await getSessionCookies({
          password: user01Password,
          server,
          username: user01.username,
        });

        // when
        const response = await server
          .get(`/tags/values/${tagValue06.tagValueID}`)
          .set("cookie", [secretCookie, sessionIDCookie]);

        // then
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(expectedTagValue);
      });
    });
  });
});
