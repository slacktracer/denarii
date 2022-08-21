import { jest } from "@jest/globals";

import { transfer01, transferID01, userID01 } from "../../../../data/data.js";
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

const { readTransfer } = await import(
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

describe("read transfer", () => {
  test("an existing transfer is returned", async () => {
    // given
    const expectedTransfer = expect.objectContaining({
      ...transfer01,
      at: new Date(transfer01.at),
    });

    // when
    const actualTransfer = await readTransfer({
      transferID: transferID01,
      userID: userID01,
    });

    // then
    expect(actualTransfer).toEqual(expectedTransfer);
  });
});
