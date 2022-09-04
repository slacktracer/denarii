import { db } from "../../connect.js";
import { loadQuery } from "../../functions/load-query.js";

const readOperationQuery = loadQuery({
  base: import.meta.url,
  url: "./read-operation.sql",
});

export const readOperation = async ({ operationID, userID }) => {
  const operation = await db.oneOrNone(readOperationQuery, {
    operationID,
    userID,
  });

  return operation;
};
