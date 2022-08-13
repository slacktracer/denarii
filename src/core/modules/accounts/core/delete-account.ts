import { db, loadQuery } from "../../../../persistence/persistence.js";

const deleteAccountQuery = loadQuery({
  base: import.meta.url,
  url: "./delete-account.sql",
});

export const deleteAccount = ({ accountID, userID }) =>
  db.none(deleteAccountQuery, { accountID, userID });
