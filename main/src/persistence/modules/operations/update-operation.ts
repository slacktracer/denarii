import { db } from "../../connect.js";
import { loadQuery } from "../../functions/load-query.js";

const updateOperationQuery = loadQuery({
  base: import.meta.url,
  url: "./update-operation.sql",
});

export const updateOperation = async ({ operationID, data, userID }) => {
  const { ...update } = data;

  const sets = db.$config.pgp.helpers.sets(update);

  const updatedOperation = await db.one(updateOperationQuery, {
    operationID,
    sets,
    userID,
  });

  return updatedOperation;
};
