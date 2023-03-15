import { db } from "../../connect.js";

export const readTransfers = async ({ userID }) => {
  const transfers = await db.transfer.findMany({
    where: {
      userID,
    },
  });

  return transfers;
};
