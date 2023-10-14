import { describe, expect, test, vi } from "vitest";

import { categories, userPasswords, users } from "../../data/data.js";
import { getServer } from "../../functions/get-server.js";
import { getSessionCookies } from "../../functions/get-session-cookies.js";
import * as mockConnect from "../../mocks/persistence/connect.js";

vi.mock(`../../../main/src/persistence/connect.js`, () => mockConnect);

const { user01 } = users.$;
const { user01Password } = userPasswords.$;

const { category01, category05 } = categories.$;

describe("GET /categories", () => {
  test("it returns all the given user categories", async () => {
    // given
    const server = await getServer();

    const expectedCategories = expect.arrayContaining(
      categories
        .map((category) => Object.assign({}, category))
        .filter((category) => category.userID === user01.userID)
        .map((category) => {
          category.updatedAt = null;

          return category;
        }),
    );

    const { secretCookie, sessionIDCookie } = await getSessionCookies({
      password: user01Password,
      server,
      username: user01.username,
    });

    // when
    const response = await server
      .get("/categories")
      .set("cookie", [secretCookie, sessionIDCookie]);

    // then
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expectedCategories);
  });

  describe("a category ID was given", () => {
    test("it returns just the category with the given ID", async () => {
      // given
      const server = await getServer();

      const expectedCategory = expect.objectContaining(category01);

      const { secretCookie, sessionIDCookie } = await getSessionCookies({
        password: user01Password,
        server,
        username: user01.username,
      });

      // when
      const response = await server
        .get(`/categories/${category01.categoryID}`)
        .set("cookie", [secretCookie, sessionIDCookie]);

      // then
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(expectedCategory);
    });

    describe("the given category does not belong to the session user", () => {
      test("it returns null", async () => {
        // given
        const server = await getServer();

        const expectedCategory = null;

        const { secretCookie, sessionIDCookie } = await getSessionCookies({
          password: user01Password,
          server,
          username: user01.username,
        });

        // when
        const response = await server
          .get(`/categories/${category05.categoryID}`)
          .set("cookie", [secretCookie, sessionIDCookie]);

        // then
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(expectedCategory);
      });
    });
  });
});
