import { db } from "../../connect.js";

export const updateTransfer = async ({ data, transferID, userID }) => {
  const { ...update } = data;

  const updatedTransfer = await db.transfer.update({
    data: {
      ...update,
    },
    where: {
      transferID,
      userID,
    },
  });

  return updatedTransfer;
};
