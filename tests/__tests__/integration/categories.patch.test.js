import { describe, expect, test, vi } from "vitest";

import { NO_SUCH_GROUP } from "../../../main/src/domain/data/errors.js";
import { categories, groups, userPasswords, users } from "../../data/data.js";
import { getServer } from "../../functions/get-server.js";
import { getSessionCookies } from "../../functions/get-session-cookies.js";
import * as mockConnect from "../../mocks/persistence/connect.js";

vi.mock(`../../../main/src/persistence/connect.js`, () => mockConnect);

const { category01 } = categories.$;
const { group02, group03 } = groups.$;
const { user01 } = users.$;
const { user01Password } = userPasswords.$;

describe("PATCH /categories", () => {
  describe("a category ID was given", () => {
    test("an existing category is updated", async () => {
      // given
      const server = await getServer();

      const groupID = group02.groupID;
      const name = "Updated Category!";

      const expectedCategory = expect.objectContaining({ name });

      const { secretCookie, sessionIDCookie } = await getSessionCookies({
        password: user01Password,
        server,
        username: user01.username,
      });

      // when
      const response = await server
        .patch(`/categories/${category01.categoryID}`)
        .send({ groupID, name })
        .set("cookie", [secretCookie, sessionIDCookie]);

      // then
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(expectedCategory);
    });

    describe("the given group does not belong to the given user or does not exist", () => {
      test("an error is returned, no category is updated", async () => {
        // given
        const server = await getServer();

        const groupID = group03.groupID;
        const name = "Updated Category!";

        const expectedResponseBody = { message: NO_SUCH_GROUP.description };

        const { secretCookie, sessionIDCookie } = await getSessionCookies({
          password: user01Password,
          server,
          username: user01.username,
        });

        // when
        const response = await server
          .patch(`/categories/${category01.categoryID}`)
          .send({ groupID, name })
          .set("cookie", [secretCookie, sessionIDCookie]);

        // then
        expect(response.status).toEqual(400);
        expect(response.body).toEqual(expectedResponseBody);
      });
    });
  });
});
