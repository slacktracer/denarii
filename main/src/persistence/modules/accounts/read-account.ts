import { db } from "../../connect.js";

export const readAccount = async ({ accountID, userID }) => {
  const account = await db.account.findFirst({
    where: {
      accountID,
      userID,
    },
  });

  return account;
};
