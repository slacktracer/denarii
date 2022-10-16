import { db } from "../../connect.js";
import { loadQuery } from "../../functions/load-query.js";

const deleteTagQuery = loadQuery({
  base: import.meta.url,
  url: "./delete-tag.sql",
});

export const deleteTag = async ({ tagID, userID }) => {
  const result = await db.result(deleteTagQuery, {
    tagID,
    userID,
  });

  return { deletedRowsCount: result.rowCount };
};
