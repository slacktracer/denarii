import { db, loadQuery } from "../../persistence.js";

const deleteTransferQuery = loadQuery({
  base: import.meta.url,
  url: "./delete-transfer.sql",
});

export const deleteTransfer = ({ transferID, userID }) =>
  db.none(deleteTransferQuery, { transferID, userID });
