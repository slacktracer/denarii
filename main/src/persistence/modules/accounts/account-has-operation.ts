import { db } from "../../connect.js";

export const accountHasOperation = async ({ accountID }): Promise<boolean> => {
  const operation = await db.operation.findFirst({
    where: { accountID },
  });

  return operation !== null;
};
