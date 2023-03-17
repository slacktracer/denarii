import { db } from "../../connect.js";

export const accountHasTransfer = async ({ accountID }): Promise<boolean> => {
  const transfer = await db.transfer.findFirst({
    where: { OR: [{ fromAccountID: accountID }, { toAccountID: accountID }] },
  });

  return transfer !== null;
};
