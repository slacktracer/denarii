import { db } from "../../connect.js";

export const readAccounts = async ({ userID }) => {
  const accounts = await db.account.findMany({ where: { userID } });

  return accounts;
};
