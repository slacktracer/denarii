import { db, loadQuery } from "../../../../persistence/persistence.js";

const deleteOperationQuery = loadQuery({
  base: import.meta.url,
  url: "./delete-operation.sql",
});

export const deleteOperation = ({ operationID, userID }) =>
  db.none(deleteOperationQuery, { operationID, userID });
