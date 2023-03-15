import { db } from "../../connect.js";

export const updateAccount = async ({ accountID, data, userID }) => {
  const { ...update } = data;

  const updatedAccount = await db.account.update({
    data: {
      ...update,
    },
    where: { accountID, userID },
  });

  return updatedAccount;
};
