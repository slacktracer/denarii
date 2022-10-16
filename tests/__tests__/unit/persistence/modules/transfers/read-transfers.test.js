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

const { user01 } = users.$;

const { prepareTestDatabase } = await import(
  "../../../../../functions/prepare-test-database.js"
);

const { disconnect } = await import("../../../../../functions/disconnect.js");

const {
  transfers: { readTransfers },
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

describe("read transfers", () => {
  test("all existing transfers for the given user are returned", async () => {
    // given
    const expectedTransferCount = transfers.filter(
      (transfer) => transfer.userID === user01.userID,
    ).length;

    // when
    const actualTransfers = await readTransfers({ userID: user01.userID });

    // then
    expect(actualTransfers.length).toEqual(expectedTransferCount);
  });
});
