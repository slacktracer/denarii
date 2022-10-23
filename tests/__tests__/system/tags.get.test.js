import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

import { tags, userPasswords, users } from "../../data/data.js";
import { getServer } from "../../functions/get-server.js";
import { getSessionIDCookie } from "../../functions/get-session-id-cookie.js";
import * as mockConnect from "../../mocks/persistence/connect.js";

jest.unstable_mockModule(
  `../../../main/src/persistence/connect.js`,
  () => mockConnect,
);

const { user01 } = users.$;
const { user01Password } = userPasswords.$;

const { tag01, tag06 } = tags.$;

const { prepareTestDatabase } = await import(
  "../../functions/prepare-test-database.js"
);

const { disconnect } = await import("../../functions/disconnect.js");

let backup;

afterAll(async () => {
  await disconnect();
});

beforeAll(async () => {
  backup = await prepareTestDatabase();
});

beforeEach(async () => {
  backup.restore();
});

describe("GET /tags", () => {
  test("it returns all the given user tags", async () => {
    // given
    const server = await getServer();

    const expectedTags = tags
      .filter((tag) => tag.userID === user01.userID)
      .map((tag) => {
        tag.updatedAt = null;

        return tag;
      });

    const sessionIDCookie = await getSessionIDCookie({
      password: user01Password,
      server,
      username: user01.username,
    });

    // when
    const response = await server.get("/tags").set("cookie", sessionIDCookie);

    // then
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expectedTags);
  });

  describe("a tag ID was given", () => {
    test("it returns just the tag with the given ID", async () => {
      // given
      const server = await getServer();

      const expectedTag = expect.objectContaining(tag01);

      const sessionIDCookie = await getSessionIDCookie({
        password: user01Password,
        server,
        username: user01.username,
      });

      // when
      const response = await server
        .get(`/tags/${tag01.tagID}`)
        .set("cookie", sessionIDCookie);

      // then
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(expectedTag);
    });

    describe("the given tag does not belong to the session user", () => {
      test("it returns null", async () => {
        // given
        const server = await getServer();

        const expectedTag = null;

        const sessionIDCookie = await getSessionIDCookie({
          password: user01Password,
          server,
          username: user01.username,
        });

        // when
        const response = await server
          .get(`/tags/${tag06.tagID}`)
          .set("cookie", sessionIDCookie);

        // then
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(expectedTag);
      });
    });
  });
});
