import { describe, expect, test, vi } from "vitest";

import { NO_SUCH_GROUP } from "../../../main/src/domain/data/errors.js";
import { groups, userPasswords, users } from "../../data/data.js";
import { getServer } from "../../functions/get-server.js";
import { getSessionCookies } from "../../functions/get-session-cookies.js";
import * as mockConnect from "../../mocks/persistence/connect.js";

vi.mock(`../../../main/src/persistence/connect.js`, () => mockConnect);

const { group01, group03 } = groups.$;
const { user01 } = users.$;
const { user01Password } = userPasswords.$;

describe("POST /categories", () => {
  test("a new category is created and returned", async () => {
    // given
    const server = await getServer();

    const groupID = group01.groupID;

    const name = "New Category!";

    const expectedCategory = expect.objectContaining({ name });

    const { secretCookie, sessionIDCookie } = await getSessionCookies({
      password: user01Password,
      server,
      username: user01.username,
    });

    // when
    const response = await server
      .post("/categories")
      .send({ groupID, name })
      .set("cookie", [secretCookie, sessionIDCookie]);

    // then
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expectedCategory);
  });

  describe("the given group does not belong to the given user or does not exist", () => {
    test("an error is returned, no category is created", async () => {
      // given
      const server = await getServer();

      const groupID = group03.groupID;

      const name = "New Category!";

      const expectedResponseBody = { message: NO_SUCH_GROUP.description };

      const { secretCookie, sessionIDCookie } = await getSessionCookies({
        password: user01Password,
        server,
        username: user01.username,
      });

      // when
      const response = await server
        .post("/categories")
        .send({ groupID, name })
        .set("cookie", [secretCookie, sessionIDCookie]);

      // then
      expect(response.status).toEqual(400);
      expect(response.body).toEqual(expectedResponseBody);
    });
  });
});
