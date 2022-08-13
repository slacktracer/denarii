import { db } from "../../../../persistence/persistence.js";
import { loadQuery } from "../../../../persistence/load-query.js";

const deleteOperationQuery = loadQuery({
  base: import.meta.url,
  url: "./delete-operation.sql",
});

export const deleteOperation = ({ operationID, userID }) =>
  db.none(deleteOperationQuery, { operationID, userID });
