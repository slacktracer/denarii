import { describe, expect, test, vi } from "vitest";

import { NO_SUCH_CATEGORY } from "../../../main/src/domain/data/errors.js";
import { categories, userPasswords, users } from "../../data/data.js";
import { getServer } from "../../functions/get-server.js";
import { getSessionCookies } from "../../functions/get-session-cookies.js";
import * as mockConnect from "../../mocks/persistence/connect.js";

vi.mock(`../../../main/src/persistence/connect.js`, () => mockConnect);

const { category01, category05 } = categories.$;
const { user01 } = users.$;
const { user01Password } = userPasswords.$;

describe("DELETE /categories", () => {
  test("the category with the given ID is deleted", async () => {
    // given
    const expectedCategory = { ...category01, deleted: true };

    const server = await getServer();

    const { secretCookie, sessionIDCookie } = await getSessionCookies({
      password: user01Password,
      server,
      username: user01.username,
    });

    // when
    const response = await server
      .delete(`/categories/${category01.categoryID}`)
      .set("cookie", [secretCookie, sessionIDCookie]);

    // then
    expect(response.status).toEqual(200);
    expect(response.body.deletedCategory).toEqual(expectedCategory);
  });

  describe("the category does not belong to the given user or does not exist", () => {
    test("an error is returned, no category is deleted", async () => {
      // given
      const server = await getServer();

      const { secretCookie, sessionIDCookie } = await getSessionCookies({
        password: user01Password,
        server,
        username: user01.username,
      });

      const expectedResponseBody = { message: NO_SUCH_CATEGORY.description };

      // when
      const response = await server
        .delete(`/categories/${category05.categoryID}`)
        .set("cookie", [secretCookie, sessionIDCookie]);

      // then
      expect(response.status).toEqual(404);
      expect(response.body).toEqual(expectedResponseBody);
    });
  });
});
