import { randomUUID } from "crypto";

import { createOperationParameter } from "../../../types.js";
import { db } from "../../connect.js";

export const createOperation = ({ data, userID }: createOperationParameter) => {
  const {
    accountID,
    amount,
    amountPerUnit,
    at,
    atTimezone,
    categoryID,
    comments,
    confirmed,
    createdAtTimezone,
    operationID,
    type,
    unitCount,
  } = data;

  const createdOperation = db.operation.create({
    data: {
      accountID,
      amount,
      amountPerUnit,
      at,
      atTimezone,
      categoryID,
      comments,
      confirmed,
      createdAt: new Date(),
      createdAtTimezone,
      operationID: operationID ?? randomUUID(),
      type,
      unitCount,
      userID,
    },
    include: {
      account: {
        select: {
          accountID: true,
          name: true,
        },
      },
      category: {
        select: {
          categoryID: true,
          name: true,
        },
      },
    },
  });

  return createdOperation;
};
