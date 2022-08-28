import { db, loadQuery } from "../../persistence.js";

const readAccountQuery = loadQuery({
  base: import.meta.url,
  url: "./read-account.sql",
});

export const readAccount = async ({ accountID, userID }) => {
  const account = await db.oneOrNone(readAccountQuery, { accountID, userID });

  return account;
};
