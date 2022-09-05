import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

import { transferID01, transfers, userID01 } from "../../../../../data/data.js";
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

const { readTransfers, updateTransfer } = await import(
  `denarii/src/persistence/modules/transfers/transfers.js`
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

describe("update transfer", () => {
  test("an existing transfer is updated", async () => {
    // given
    const newAmount = 1_000_00;

    const expectedTransfer = expect.objectContaining({
      transferID: transferID01,
      amount: newAmount,
      userID: userID01,
    });

    const expectedTransferCount = transfers.filter(
      (transfer) => transfer.userID === userID01,
    ).length;

    // when
    const updatedTransfer = await updateTransfer({
      transferID: transferID01,
      data: { amount: newAmount },
      userID: userID01,
    });

    const actualTransferCount = (await readTransfers({ userID: userID01 }))
      .length;

    // then
    expect(updatedTransfer).toEqual(expectedTransfer);
    expect(actualTransferCount).toEqual(expectedTransferCount);
  });
});
