import { db } from "../../connect.js";
import { loadQuery } from "../../functions/load-query.js";

const deleteTransferQuery = loadQuery({
  base: import.meta.url,
  url: "./delete-transfer.sql",
});

export const deleteTransfer = ({ transferID, userID }) =>
  db.none(deleteTransferQuery, { transferID, userID });
