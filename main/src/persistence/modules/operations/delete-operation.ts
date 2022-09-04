import { db } from "../../connect.js";
import { loadQuery } from "../../functions/load-query.js";

const deleteOperationQuery = loadQuery({
  base: import.meta.url,
  url: "./delete-operation.sql",
});

export const deleteOperation = ({ operationID, userID }) =>
  db.none(deleteOperationQuery, { operationID, userID });
