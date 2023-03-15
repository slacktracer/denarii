import { mockDataAsInsertStatements } from "../data/data.js";
import { db } from "../mocks/persistence/connect.js";

export const prepareTestDatabase = async () => {
  for (const insertStatement of mockDataAsInsertStatements) {
    await db.$queryRawUnsafe(insertStatement);
  }
};
