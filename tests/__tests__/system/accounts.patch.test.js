import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

import { accountID01 } from "../../data/data.js";
import { endConnections } from "../../functions/end-connections.js";
import { getServer } from "../../functions/get-server.js";
import { getSessionIDCookie } from "../../functions/get-session-id-cookie.js";
import * as mockConnect from "../../mocks/persistence/connect.js";

jest.unstable_mockModule(
  `../../../main/src/persistence/connect.js`,
  () => mockConnect,
);

const { prepareTestDatabase } = await import(
  "../../functions/prepare-test-database.js"
);

const { db, redisServer } = await import(`denarii/src/persistence/connect.js`);

const { legacyRedisClient } = await import(
  "../../../main/src/httpi/session-store.js"
);

let backup;

afterAll(async () => {
  await endConnections({ db, legacyRedisClient, redisServer });
});

beforeAll(async () => {
  backup = await prepareTestDatabase();
});

beforeEach(async () => {
  backup.restore();
});

describe("/PATCH accounts", () => {
  describe("an account ID was given", () => {
    test("an existing account is updated", async () => {
      // given
      const server = await getServer();

      const initialAmount = 0;
      const name = "New Account!";

      const expectedAccount = expect.objectContaining({ initialAmount, name });

      const sessionIDCookie = await getSessionIDCookie({
        password: "1234",
        server,
        username: "mr.user",
      });

      // when
      const response = await server
        .patch(`/accounts/${accountID01}`)
        .send({ initialAmount, name })
        .set("cookie", sessionIDCookie);

      // then
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(expectedAccount);
    });
  });
});
