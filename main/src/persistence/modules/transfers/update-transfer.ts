import { db } from "../../connect.js";

export const updateTransfer = async ({ data, transferID, userID }) => {
  const { ...update } = data;

  const updatedTransfer = await db.transfer.update({
    data: {
      ...update,
    },
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

  return updatedTransfer;
};
