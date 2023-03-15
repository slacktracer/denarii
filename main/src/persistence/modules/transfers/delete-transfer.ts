import { db } from "../../connect.js";

export const deleteTransfer = async ({ transferID, userID }) => {
  const result = await db.transfer.update({
    data: { deleted: true },
    where: {
      transferID,
      userID,
    },
  });

  return { deletedTransfer: result };
};
