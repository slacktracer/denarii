import { randomUUID } from "crypto";

import { db } from "../../connect.js";

export const createTransfer = ({ data, userID }) => {
  const {
    amount,
    at,
    atTimezone,
    comments,
    confirmed,
    createdAtTimezone,
    fromAccountID,
    toAccountID,
    transferID,
  } = data;

  const createdTransfer = db.transfer.create({
    data: {
      amount,
      at,
      atTimezone,
      comments,
      confirmed,
      createdAt: new Date(),
      createdAtTimezone,
      fromAccountID,
      toAccountID,
      transferID: transferID ?? randomUUID(),
      userID,
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
  });

  return createdTransfer;
};
