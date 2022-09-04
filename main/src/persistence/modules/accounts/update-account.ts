import { db } from "../../connect.js";
import { customPGPHelpersSets } from "../../functions/custom-pgp-helpers-sets.js";
import { loadQuery } from "../../functions/load-query.js";

const updateAccountQuery = loadQuery({
  base: import.meta.url,
  url: "./update-account.sql",
});

export const updateAccount = async ({ accountID, data, userID }) => {
  const { ...update } = data;

  const sets = customPGPHelpersSets(update);

  const updatedAccount = await db.one(updateAccountQuery, {
    accountID,
    sets,
    userID,
  });

  return updatedAccount;
};
