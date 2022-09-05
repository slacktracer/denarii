import { db } from "../../connect.js";
import { loadQuery } from "../../functions/load-query.js";

const deleteGroupQuery = loadQuery({
  base: import.meta.url,
  url: "./delete-group.sql",
});

export const deleteGroup = async ({ groupID, userID }) => {
  const result = await db.result(deleteGroupQuery, {
    groupID,
    userID,
  });

  return { deletedRowsCount: result.rowCount };
};
