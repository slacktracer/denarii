import { db, loadQuery } from "../../../../persistence/persistence.js";

const readOperationsQuery = loadQuery({
  base: import.meta.url,
  url: "./read-operations.sql",
});

export const readOperations = async ({ userID }) => {
  const operations = await db.manyOrNone(readOperationsQuery, { userID });

  return operations;
};
