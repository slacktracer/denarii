import { db } from "../../connect.js";

export const readOperation = async ({ operationID, userID }) => {
  const operation = await db.operation.findUnique({
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
    where: {
      operationID,
      userID,
    },
  });

  return operation;
};
