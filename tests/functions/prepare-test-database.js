import { mockDataAsInsertStatements } from "../data/data.js";

const { db, loadQuery, pgm } = await import(
  `../../main/src/persistence/persistence.js`
);

const createTablesQuery = loadQuery({
  base: import.meta.url,
  url: `../../main/src/persistence/create-tables.sql`,
});

export const prepareTestDatabase = async () => {
  await db.query(createTablesQuery);

  await db.query(mockDataAsInsertStatements);

  return pgm.backup();
};
