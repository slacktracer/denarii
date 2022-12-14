import { db } from "../../connect.js";
import { loadQuery } from "../../functions/load-query.js";

const deleteAccountQuery = loadQuery({
  base: import.meta.url,
  url: "./delete-account.sql",
});

export const deleteAccount = async ({ accountID, userID }) => {
  const result = await db.result(deleteAccountQuery, {
    accountID,
    userID,
  });

  return { deletedRowsCount: result.rowCount };
};
