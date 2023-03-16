import { NO_SUCH_TAG_KEY } from "denarii/src/domain/data/errors.js";
import { describe, expect, test, vi } from "vitest";

import { tagKeys, userPasswords, users } from "../../data/data.js";
import { getServer } from "../../functions/get-server.js";
import { getSessionCookies } from "../../functions/get-session-cookies.js";
import * as mockConnect from "../../mocks/persistence/connect.js";

vi.mock(`../../../main/src/persistence/connect.js`, () => mockConnect);

const { user01 } = users.$;
const { user01Password } = userPasswords.$;

const { tagKey03, tagKey04 } = tagKeys.$;

describe("DELETE /tags/keys", () => {
  test("the tagKey with the given ID is deleted", async () => {
    // given
    const expectedTagKey = { ...tagKey03, deleted: true };

    const server = await getServer();

    const { secretCookie, sessionIDCookie } = await getSessionCookies({
      password: user01Password,
      server,
      username: user01.username,
    });

    // when
    const response = await server
      .delete(`/tags/keys/${tagKey03.tagKeyID}`)
      .set("cookie", [secretCookie, sessionIDCookie]);

    // then
    expect(response.status).toEqual(200);
    expect(response.body.deletedTagKey).toEqual(expectedTagKey);
  });

  describe("the tagKey does not belong to the given user or does not exist", () => {
    test("an error is returned, no tagKey is deleted", async () => {
      // given
      const server = await getServer();

      const { secretCookie, sessionIDCookie } = await getSessionCookies({
        password: user01Password,
        server,
        username: user01.username,
      });

      const expectedResponseBody = { message: NO_SUCH_TAG_KEY.description };

      // when
      const response = await server
        .delete(`/tags/keys/${tagKey04.tagKeyID}`)
        .set("cookie", [secretCookie, sessionIDCookie]);

      // then
      expect(response.status).toEqual(404);
      expect(response.body).toEqual(expectedResponseBody);
    });
  });
});
