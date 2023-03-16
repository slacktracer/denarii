import { db } from "../../connect.js";

export const deleteOperation = async ({ operationID, userID }) => {
  const result = await db.operation.update({
    data: {
      deleted: true,
    },
    where: { operationID, userID },
  });

  return { deletedOperation: result };
};
