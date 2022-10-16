import { db } from "../../connect.js";
import { loadQuery } from "../../functions/load-query.js";

const deleteTagValueQuery = loadQuery({
  base: import.meta.url,
  url: "./delete-tag-value.sql",
});

export const deleteTagValue = async ({ tagValueID, userID }) => {
  const result = await db.result(deleteTagValueQuery, {
    tagValueID,
    userID,
  });

  return { deletedRowsCount: result.rowCount };
};
