import "../../main/src/persistence/setup.js";

import { mockDataAsInsertStatements } from "../data/data.js";

const { db, pgm } = await import(`../../main/src/persistence/connect.js`);

const { loadQuery } = await import(
  `../../main/src/persistence/functions/load-query.js`
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
