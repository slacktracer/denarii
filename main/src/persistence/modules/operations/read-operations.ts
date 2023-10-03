import { db } from "../../connect.js";

export const readOperations = async ({ userID }) => {
  const operations = await db.operation.findMany({
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
      userID,
    },
  });

  return operations;
};
