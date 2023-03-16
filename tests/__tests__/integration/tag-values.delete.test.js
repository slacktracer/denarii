import { NO_SUCH_TAG_VALUE } from "denarii/src/domain/data/errors.js";
import { describe, expect, test, vi } from "vitest";

import { tagValues, userPasswords, users } from "../../data/data.js";
import { getServer } from "../../functions/get-server.js";
import { getSessionCookies } from "../../functions/get-session-cookies.js";
import * as mockConnect from "../../mocks/persistence/connect.js";

vi.mock(`../../../main/src/persistence/connect.js`, () => mockConnect);

const { user01 } = users.$;
const { user01Password } = userPasswords.$;

const { tagValue05, tagValue06 } = tagValues.$;

describe("DELETE /tags/values", () => {
  test("the tagValue with the given ID is deleted", async () => {
    // given
    const expectedTagValue = { ...tagValue05, deleted: true };

    const server = await getServer();

    const { secretCookie, sessionIDCookie } = await getSessionCookies({
      password: user01Password,
      server,
      username: user01.username,
    });

    // when
    const response = await server
      .delete(`/tags/values/${tagValue05.tagValueID}`)
      .set("cookie", [secretCookie, sessionIDCookie]);

    // then
    expect(response.status).toEqual(200);
    expect(response.body.deletedTagValue).toEqual(expectedTagValue);
  });

  describe("the tagValue does not belong to the given user or does not exist", () => {
    test("an error is returned, no tagValue is deleted", async () => {
      // given
      const server = await getServer();

      const { secretCookie, sessionIDCookie } = await getSessionCookies({
        password: user01Password,
        server,
        username: user01.username,
      });

      const expectedResponseBody = { message: NO_SUCH_TAG_VALUE.description };

      // when
      const response = await server
        .delete(`/tags/values/${tagValue06.tagValueID}`)
        .set("cookie", [secretCookie, sessionIDCookie]);

      // then
      expect(response.status).toEqual(404);
      expect(response.body).toEqual(expectedResponseBody);
    });
  });
});
