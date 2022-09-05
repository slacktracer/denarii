import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

import { transfers, transferID04, userID01 } from "../../../../../data/data.js";
import { endConnections } from "../../../../../functions/end-connections.js";
import * as mockConnect from "../../../../../mocks/persistence/connect.js";

jest.unstable_mockModule(
  `../../../../../../main/src/persistence/connect.js`,
  () => mockConnect,
);

const { prepareTestDatabase } = await import(
  "../../../../../functions/prepare-test-database.js"
);

const { db, legacyRedisClient, redisServer } = await import(
  `denarii/src/persistence/connect.js`
);

const {
  transfers: { deleteTransfer, readTransfers },
} = await import(`denarii/src/persistence/persistence.js`);

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

describe("delete transfer", () => {
  test("an existing transfer is deleted", async () => {
    // given
    const expectedTransferCount =
      transfers.filter((transfer) => transfer.userID === userID01).length - 1;

    // when
    await deleteTransfer({ transferID: transferID04, userID: userID01 });
    const actualTransferCount = (await readTransfers({ userID: userID01 }))
      .length;

    // then
    expect(actualTransferCount).toEqual(expectedTransferCount);
  });
});
