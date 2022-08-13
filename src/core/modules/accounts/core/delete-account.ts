import { db } from "../../../../persistence/persistence.js";
import { loadQuery } from "../../../../persistence/load-query.js";

const deleteAccountQuery = loadQuery({
  base: import.meta.url,
  url: "./delete-account.sql",
});

export const deleteAccount = ({ accountID, userID }) =>
  db.none(deleteAccountQuery, { accountID, userID });
