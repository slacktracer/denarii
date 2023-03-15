import { db } from "../../connect.js";

export const readOperations = async ({ userID }) => {
  const operations = await db.operation.findMany({
    where: {
      userID,
    },
  });

  console.log("this is new stuff from persistence with prisma");

  return operations;
};
