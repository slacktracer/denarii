import { describe, expect, test, vi } from "vitest";

import { tagKeys, userPasswords, users } from "../../data/data.js";
import { getServer } from "../../functions/get-server.js";
import { getSessionCookies } from "../../functions/get-session-cookies.js";
import * as mockConnect from "../../mocks/persistence/connect.js";

vi.mock(`../../../main/src/persistence/connect.js`, () => mockConnect);

const { user01 } = users.$;
const { user01Password } = userPasswords.$;

const { tagKey01 } = tagKeys.$;

describe("PATCH /tags/keys", () => {
  describe("a tagKey ID was given", () => {
    test("an existing tagKey is updated", async () => {
      // given
      const server = await getServer();

      const name = "New TagKey!";

      const expectedTagKey = expect.objectContaining({ name });

      const { secretCookie, sessionIDCookie } = await getSessionCookies({
        password: user01Password,
        server,
        username: user01.username,
      });

      // when
      const response = await server
        .patch(`/tags/keys/${tagKey01.tagKeyID}`)
        .send({ name })
        .set("cookie", [secretCookie, sessionIDCookie]);

      // then
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(expectedTagKey);
    });
  });
});
