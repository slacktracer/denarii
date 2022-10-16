import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

import { transfers, users } from "../../../../../data/data.js";
import * as mockConnect from "../../../../../mocks/persistence/connect.js";

jest.unstable_mockModule(
  `../../../../../../main/src/persistence/connect.js`,
  () => mockConnect,
);

const { transfer01 } = transfers.$;
const { user01 } = users.$;

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
      transferID: transfer01.transferID,
      amount: newAmount,
      userID: user01.userID,
    });

    const expectedTransferCount = transfers.filter(
      (transfer) => transfer.userID === user01.userID,
    ).length;

    // when
    const updatedTransfer = await updateTransfer({
      transferID: transfer01.transferID,
      data: { amount: newAmount },
      userID: user01.userID,
    });

    const actualTransferCount = (await readTransfers({ userID: user01.userID }))
      .length;

    // then
    expect(updatedTransfer).toEqual(expectedTransfer);
    expect(actualTransferCount).toEqual(expectedTransferCount);
  });
});
