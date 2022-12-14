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
  transfers: { readTransfer },
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
      transferID: transfer01.transferID,
      userID: user01.userID,
    });

    // then
    expect(actualTransfer).toEqual(expectedTransfer);
  });
});
