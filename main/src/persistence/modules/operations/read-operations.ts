import { db } from "../../connect.js";

export const readOperations = async ({ userID }) => {
  const operations = await db.operation.findMany({
    where: {
      userID,
    },
  });

  return operations;
};
