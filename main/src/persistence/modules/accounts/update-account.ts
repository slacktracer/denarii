import { customPGPHelpersSets, db, loadQuery } from "../../persistence.js";

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
