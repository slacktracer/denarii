import { db } from "../../connect.js";

export const readOperations = async ({ datetimeRange, userID }) => {
  const [from, to] = datetimeRange;

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
          group: {
            select: {
              groupID: true,
              name: true,
            },
          },
        },
      },
    },
    where: {
      at: {
        gte: from,
        lte: to,
      },
      userID,
    },
    orderBy: {
      at: "desc",
    },
  });

  return operations;
};
