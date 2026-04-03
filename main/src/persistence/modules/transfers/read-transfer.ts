import { db } from "../../connect.js";

export const readTransfer = async ({ transferID, userID }) => {
  const transfer = await db.transfer.findUnique({
    include: {
      fromAccount: {
        select: {
          accountID: true,
          name: true,
        },
      },
      toAccount: {
        select: {
          accountID: true,
          name: true,
        },
      },
    },
    where: {
      transferID,
      userID,
    },
  });

  return transfer;
};
