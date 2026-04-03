import { db } from "../../connect.js";

export const readTransfers = async ({ datetimeRange, userID }) => {
  const [from, to] = datetimeRange;

  const transfers = await db.transfer.findMany({
    include: {
      fromAccount: {
        select: {
          accountID: true,
          name: true,
        },
      },
      toAccount: {
        select: {
          accountID: true,
          name: true,
        },
      },
    },
    where: {
      at: {
        gte: from,
        lte: to,
      },
      deleted: false,
      userID,
    },
    orderBy: {
      at: "desc",
    },
  });

  return transfers;
};
