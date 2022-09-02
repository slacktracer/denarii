import { jest } from "@jest/globals";

import {
  transfer01,
  transferID01,
  userID01,
} from "../../../../../data/data.js";
import { endConnections } from "../../../../../functions/end-connections.js";

import * as mockConnect from "../../../../../mocks/persistence/connect.js";

jest.unstable_mockModule(
  `../../../../../../main/src/persistence/connect.js`,
  () => mockConnect,
);

const { prepareTestDatabase } = await import(
  "../../../../../functions/prepare-test-database.js"
);

const { db, redisServer } = await import(
  `denarii/src/persistence/persistence.js`
);

const { readTransfer } = await import(
  `denarii/src/persistence/modules/transfers/transfers.js`
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
      createdAt: new Date(transfer01.createdAt),
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
