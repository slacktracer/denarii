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
  accountID01,
  accountID05,
  accounts,
  userID01,
} from "../../data/data.js";
import { endConnections } from "../../functions/end-connections.js";
import { getServer } from "../../functions/get-server.js";
import { getSessionIDCookie } from "../../functions/get-session-id-cookie.js";
import { inspectTable } from "../../functions/inspect-table.js";
import * as mockPersistence from "../../mocks/persistence.js";

jest.unstable_mockModule(
  `../../../main/src/persistence/persistence.js`,
  () => mockPersistence,
);

const { prepareTestDatabase } = await import(
  "../../functions/prepare-test-database.js"
);

const { db, redisServer } = await import(
  `../../../main/src/persistence/persistence.js`
);

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

describe("/DELETE accounts", () => {
  describe("the account has no operations", () => {
    test("the account with the given ID is deleted", async () => {
      // given
      const user01AccountCount = accounts.filter(
        (account) => account.userID === userID01,
      ).length;

      const server = await getServer();

      const sessionIDCookie = await getSessionIDCookie({
        password: "1234",
        server,
        username: "mr.user",
      });

      const expectedDeletedRowsCount = 1;

      // when
      const response = await server
        .delete(`/accounts/${accountID05}`)
        .set("cookie", sessionIDCookie);

      const rows = inspectTable({
        table: "account",
        template: { userID: userID01 },
      });

      // then
      expect(response.status).toEqual(200);
      expect(response.body.deletedRowsCount).toEqual(expectedDeletedRowsCount);
      expect(rows.length).toEqual(user01AccountCount - 1);
    });

    describe("the account has operations", () => {
      test("an error is returned, the account is not deleted", async () => {
        // given
        const user01AccountCount = accounts.filter(
          (account) => account.userID === userID01,
        ).length;

        const server = await getServer();

        const sessionIDCookie = await getSessionIDCookie({
          password: "1234",
          server,
          username: "mr.user",
        });

        // when
        const response = await server
          .delete(`/accounts/${accountID01}`)
          .set("cookie", sessionIDCookie);

        const rows = inspectTable({
          table: "account",
          template: { userID: userID01 },
        });

        // then
        expect(response.status).toEqual(500);
        expect(rows.length).toEqual(user01AccountCount);
      });
    });
  });
});
