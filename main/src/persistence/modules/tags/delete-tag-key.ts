import { db } from "../../connect.js";
import { loadQuery } from "../../functions/load-query.js";

const deleteTagKeyQuery = loadQuery({
  base: import.meta.url,
  url: "./delete-tag-key.sql",
});

export const deleteTagKey = async ({ tagKeyID, userID }) => {
  const result = await db.result(deleteTagKeyQuery, {
    tagKeyID,
    userID,
  });

  return { deletedRowsCount: result.rowCount };
};
