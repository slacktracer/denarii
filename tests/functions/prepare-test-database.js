import { mockDataAsInsertStatements } from "../data/data.js";
import { db } from "../mocks/persistence/connect.js";

export const prepareTestDatabase = async () => {
  const insertStatements = mockDataAsInsertStatements
    .split("\n")
    .filter(Boolean);

  for (const insertStatement of insertStatements) {
    await db.$queryRawUnsafe(insertStatement);
  }
};
