import { db } from "../../connect.js";

export const updateOperation = async ({ operationID, data, userID }) => {
  const { ...update } = data;

  const updatedOperation = await db.operation.update({
    data: {
      ...update,
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
    where: { operationID, userID },
  });

  return updatedOperation;
};
