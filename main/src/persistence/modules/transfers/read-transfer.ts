import { db } from "../../connect.js";
import { loadQuery } from "../../functions/load-query.js";

const readTransferQuery = loadQuery({
  base: import.meta.url,
  url: "./read-transfer.sql",
});

export const readTransfer = async ({ transferID, userID }) => {
  const transfer = await db.oneOrNone(readTransferQuery, {
    transferID,
    userID,
  });

  return transfer;
};
