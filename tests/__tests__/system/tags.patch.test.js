import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

import { tags, tagValues, userPasswords, users } from "../../data/data.js";
import { getServer } from "../../functions/get-server.js";
import { getSessionIDCookie } from "../../functions/get-session-id-cookie.js";
import * as mockConnect from "../../mocks/persistence/connect.js";

jest.unstable_mockModule(
  `../../../main/src/persistence/connect.js`,
  () => mockConnect,
);

const { tagValue02 } = tagValues.$;
const { user01 } = users.$;
const { user01Password } = userPasswords.$;

const { tag01 } = tags.$;

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

describe("PATCH /tags", () => {
  describe("a tag ID was given", () => {
    test("an existing tag is updated", async () => {
      // given
      const server = await getServer();

      const newTagValueID = tagValue02.tagValueID;

      const expectedTag = expect.objectContaining({
        tagID: tag01.tagID,
        tagValueID: newTagValueID,
      });

      const sessionIDCookie = await getSessionIDCookie({
        password: user01Password,
        server,
        username: user01.username,
      });

      // when
      const response = await server
        .patch(`/tags/${tag01.tagID}`)
        .send({ tagValueID: newTagValueID })
        .set("cookie", sessionIDCookie);

      // then
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(expectedTag);
    });
  });
});
