import { db, loadQuery } from "../../../persistence.js";

const readAccountsQuery = loadQuery({
  base: import.meta.url,
  url: "./read-accounts.sql",
});

export const readAccounts = async ({ userID }) => {
  const accounts = await db.manyOrNone(readAccountsQuery, { userID });

  return accounts;
};
