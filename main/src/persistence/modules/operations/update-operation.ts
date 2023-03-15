import { db } from "../../connect.js";

export const updateOperation = async ({ operationID, data, userID }) => {
  const { ...update } = data;

  const updatedOperation = await db.operation.update({
    data: {
      ...update,
    },
    where: { operationID, userID },
  });

  return updatedOperation;
};
