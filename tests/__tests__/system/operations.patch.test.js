import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

import { operations, userPasswords, users } from "../../data/data.js";
import { getServer } from "../../functions/get-server.js";
import { getSessionIDCookie } from "../../functions/get-session-id-cookie.js";
import * as mockConnect from "../../mocks/persistence/connect.js";

jest.unstable_mockModule(
  `../../../main/src/persistence/connect.js`,
  () => mockConnect,
);

const { user01 } = users.$;
const { user01Password } = userPasswords.$;

const { operation01 } = operations.$;

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

describe("PATCH /operations", () => {
  describe("an operation ID was given", () => {
    test("an existing operation is updated", async () => {
      // given
      const server = await getServer();

      const updatedOperationData = { amount: 3_000_00 };

      const expectedOperation = expect.objectContaining(updatedOperationData);

      const sessionIDCookie = await getSessionIDCookie({
        password: user01Password,
        server,
        username: user01.username,
      });

      // when
      const response = await server
        .patch(`/operations/${operation01.operationID}`)
        .send(updatedOperationData)
        .set("cookie", sessionIDCookie);

      // then
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(expectedOperation);
    });
  });
});
