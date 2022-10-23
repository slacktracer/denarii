import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

import {
  operations,
  tagKeys,
  tagValues,
  userPasswords,
  users,
} from "../../data/data.js";
import { getServer } from "../../functions/get-server.js";
import { getSessionIDCookie } from "../../functions/get-session-id-cookie.js";
import * as mockConnect from "../../mocks/persistence/connect.js";

jest.unstable_mockModule(
  `../../../main/src/persistence/connect.js`,
  () => mockConnect,
);

const { operation01 } = operations.$;
const { tagKey01 } = tagKeys.$;
const { tagValue01 } = tagValues.$;
const { user01 } = users.$;
const { user01Password } = userPasswords.$;

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

describe("POST /tags", () => {
  test("a new tag is created and returned", async () => {
    // given
    const server = await getServer();

    const tagData = {
      operationID: operation01.operationID,
      tagKeyID: tagKey01.tagKeyID,
      tagValueID: tagValue01.tagValueID,
    };

    const expectedTag = expect.objectContaining(tagData);

    const sessionIDCookie = await getSessionIDCookie({
      password: user01Password,
      server,
      username: user01.username,
    });

    // when
    const response = await server
      .post("/tags")
      .send(tagData)
      .set("cookie", sessionIDCookie);

    // then
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expectedTag);
  });
});
