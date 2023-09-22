import { describe, expect, test, vi } from "vitest";

import { groups, userPasswords, users } from "../../data/data.js";
import { getServer } from "../../functions/get-server.js";
import { getSessionCookies } from "../../functions/get-session-cookies.js";
import * as mockConnect from "../../mocks/persistence/connect.js";

vi.mock(`../../../main/src/persistence/connect.js`, () => mockConnect);

const { user01 } = users.$;
const { user01Password } = userPasswords.$;

const { group01 } = groups.$;

describe("PATCH /groups", () => {
  describe("a group ID was given", () => {
    test("an existing group is updated", async () => {
      // given
      const server = await getServer();

      const name = "New Group!";

      const expectedGroup = expect.objectContaining({ name });

      const { secretCookie, sessionIDCookie } = await getSessionCookies({
        password: user01Password,
        server,
        username: user01.username,
      });

      // when
      const response = await server
        .patch(`/groups/${group01.groupID}`)
        .send({ name })
        .set("cookie", [secretCookie, sessionIDCookie]);

      // then
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(expectedGroup);
    });
  });
});
