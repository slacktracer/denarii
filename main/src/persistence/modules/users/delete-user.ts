import { db } from "../../connect.js";
import { loadQuery } from "../../functions/load-query.js";

const deleteUserQuery = loadQuery({
  base: import.meta.url,
  url: "./delete-user.sql",
});

export const deleteUser = async ({ userID }) => {
  const result = await db.result(deleteUserQuery, {
    userID,
  });

  return { deletedRowsCount: result.rowCount };
};
