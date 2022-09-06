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
import * as mockConnect from "../../../../../mocks/persistence/connect.js";

jest.unstable_mockModule(
  `../../../../../../main/src/persistence/connect.js`,
  () => mockConnect,
);

const { prepareTestDatabase } = await import(
  "../../../../../functions/prepare-test-database.js"
);

const { disconnect } = await import("../../../../../functions/disconnect.js");

const {
  transfers: { readTransfers, updateTransfer },
} = await import(`denarii/src/persistence/persistence.js`);

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
