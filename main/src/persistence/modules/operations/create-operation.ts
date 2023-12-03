import { randomUUID } from "crypto";

import { createOperationParameter } from "../../../types.js";
import { db } from "../../connect.js";

export const createOperation = async ({
  data,
  userID,
}: createOperationParameter) => {
  const {
    accountID,
    amount,
    amountPerUnit,
    at,
    atTimezone,
    categoryID,
    comments,
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
      createdAt: new Date(),
      operationID: operationID ?? randomUUID(),
      type,
      unitCount,
      userID,
    },
  });

  return createdOperation;
};
