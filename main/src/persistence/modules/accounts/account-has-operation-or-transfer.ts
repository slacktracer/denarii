import { db } from "../../connect.js";

export const accountHasOperationOrTransfer = async ({
  accountID,
}): Promise<boolean> => {
  const operation = await db.operation.findFirst({
    where: { accountID },
  });

  return operation !== null;
};
