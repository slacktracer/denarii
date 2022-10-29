import { db } from "../../connect.js";
import { loadQuery } from "../../functions/load-query.js";

const deleteTransferQuery = loadQuery({
  base: import.meta.url,
  url: "./delete-transfer.sql",
});

export const deleteTransfer = async ({ transferID, userID }) => {
  const result = await db.result(deleteTransferQuery, { transferID, userID });

  return { deletedRowsCount: result.rowCount };
};
