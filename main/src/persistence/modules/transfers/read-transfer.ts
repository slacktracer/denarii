import { db } from "../../connect.js";

export const readTransfer = async ({ transferID, userID }) => {
  const transfer = await db.transfer.findFirst({
    where: {
      transferID,
      userID,
    },
  });

  return transfer;
};
