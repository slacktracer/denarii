import { describe, expect, test, vi } from "vitest";

import { categories, userPasswords, users } from "../../data/data.js";
import { getServer } from "../../functions/get-server.js";
import { getSessionCookies } from "../../functions/get-session-cookies.js";
import * as mockConnect from "../../mocks/persistence/connect.js";

vi.mock(`../../../main/src/persistence/connect.js`, () => mockConnect);

const { user01 } = users.$;
const { user01Password } = userPasswords.$;

const { category01 } = categories.$;

describe("PATCH /categories", () => {
  describe("a category ID was given", () => {
    test("an existing category is updated", async () => {
      // given
      const server = await getServer();

      const name = "New Category!";

      const expectedCategory = expect.objectContaining({ name });

      const { secretCookie, sessionIDCookie } = await getSessionCookies({
        password: user01Password,
        server,
        username: user01.username,
      });

      // when
      const response = await server
        .patch(`/categories/${category01.categoryID}`)
        .send({ name })
        .set("cookie", [secretCookie, sessionIDCookie]);

      // then
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(expectedCategory);
    });
  });
});
