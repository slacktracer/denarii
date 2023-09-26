import { accounts, transfers } from "../../../persistence/persistence.js";
import { CustomError } from "../../custom-error.js";
import { NO_SUCH_FROM_ACCOUNT, NO_SUCH_TO_ACCOUNT } from "../../data/errors.js";

export const createTransfer = async ({ data, userID }) => {
  const fromAccount = await accounts.readAccount({
    accountID: data.fromAccountID,
    userID,
  });

  const noSuchFromAccount = fromAccount ?? true;

  if (noSuchFromAccount === true) {
    throw new CustomError({ id: NO_SUCH_FROM_ACCOUNT });
  }

  const toAccount = await accounts.readAccount({
    accountID: data.toAccountID,
    userID,
  });

  const noSuchToAccount = toAccount ?? true;

  if (noSuchToAccount === true) {
    throw new CustomError({ id: NO_SUCH_TO_ACCOUNT });
  }

  return transfers.createTransfer({
    data,
    userID,
  });
};
