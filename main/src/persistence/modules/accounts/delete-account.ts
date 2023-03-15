import { db } from "../../connect.js";

export const deleteAccount = async ({ accountID, userID }) => {
  const result = await db.account.update({
    data: {
      deleted: true,
    },
    where: { accountID, userID },
  });

  return { deletedAccount: result };
};
