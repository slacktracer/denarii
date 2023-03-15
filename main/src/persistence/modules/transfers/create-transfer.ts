import { randomUUID } from "crypto";

import { db } from "../../connect.js";

export const createTransfer = async ({ data, userID }) => {
  const { amount, at, fromAccountID, toAccountID } = data;

  const createdTransfer = db.transfer.create({
    data: {
      amount,
      at,
      createdAt: new Date(),
      fromAccountID,
      toAccountID,
      transferID: randomUUID(),
      userID,
    },
  });

  return createdTransfer;
};
