import { randomUUID } from "crypto";

import { createOperationParameter } from "../../../types.js";
import { db } from "../../connect.js";

export const createOperation = async ({
  data,
  userID,
}: createOperationParameter) => {
  const { accountID, amount, amountPerUnit, at, comments, type, unitCount } =
    data;

  const createdOperation = db.operation.create({
    data: {
      accountID,
      amount,
      amountPerUnit,
      at,
      comments,
      createdAt: new Date(),
      operationID: randomUUID(),
      type,
      unitCount,
      userID,
    },
  });

  return createdOperation;
};
