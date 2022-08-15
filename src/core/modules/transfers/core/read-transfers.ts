import { db, loadQuery } from "../../../../persistence/persistence.js";

const readTransfersQuery = loadQuery({
  base: import.meta.url,
  url: "./read-transfers.sql",
});

export const readTransfers = async ({ userID }) => {
  const transfers = await db.manyOrNone(readTransfersQuery, { userID });

  return transfers;
};
