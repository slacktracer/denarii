import { db } from "../../connect.js";

export const readOperation = async ({ operationID, userID }) => {
  const operation = await db.operation.findUnique({
    where: {
      operationID,
      userID,
    },
  });

  return operation;
};
