import { db } from "../../connect.js";
import { loadQuery } from "../../functions/load-query.js";

const readTransfersQuery = loadQuery({
  base: import.meta.url,
  url: "./read-transfers.sql",
});

export const readTransfers = async ({ userID }) => {
  const transfers = await db.manyOrNone(readTransfersQuery, { userID });

  return transfers;
};
