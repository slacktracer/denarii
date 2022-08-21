import { jest } from "@jest/globals";

import { transfers, userID01 } from "../../../../data/data.js";
import { endConnections } from "../../../../functions/end-connections.js";

import * as mockPersistence from "../../../../mocks/persistence.js";

jest.unstable_mockModule(
  `../../../../../main/src/persistence/persistence.js`,
  () => mockPersistence,
);

const { prepareTestDatabase } = await import(
  "../../../../functions/prepare-test-database.js"
);

const { db, redisServer } = await import(
  `denarii/src/persistence/persistence.js`
);

const { readTransfers } = await import(
  `denarii/src/core/modules/transfers/transfers.js`
);

let backup;

afterAll(async () => {
  await endConnections({ db, redisServer });
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
      (transfer) => transfer.userID === userID01,
    ).length;

    // when
    const actualTransfers = await readTransfers({ userID: userID01 });

    // then
    expect(actualTransfers.length).toEqual(expectedTransferCount);
  });
});
