import { db } from "../../connect.js";
import { loadQuery } from "../../functions/load-query.js";

const deleteOperationQuery = loadQuery({
  base: import.meta.url,
  url: "./delete-operation.sql",
});

export const deleteOperation = async ({ operationID, userID }) => {
  const result = await db.result(deleteOperationQuery, {
    operationID,
    userID,
  });

  return { deletedRowsCount: result.rowCount };
};
