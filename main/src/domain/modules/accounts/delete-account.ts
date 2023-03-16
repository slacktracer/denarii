import { accounts } from "../../../persistence/persistence.js";
import { CustomError } from "../../custom-error.js";
import {
  ACCOUNT_HAS_OPERATION_OR_TRANSFER,
  NO_SUCH_ACCOUNT,
} from "../../data/errors.js";

export const deleteAccount = async ({ accountID, userID }) => {
  const account = await accounts.readAccount({ accountID, userID });

  const noSuchAccount = account ?? true;

  if (noSuchAccount === true) {
    throw new CustomError({ id: NO_SUCH_ACCOUNT });
  }

  const accountHasOperationOrTransfer =
    await accounts.accountHasOperationOrTransfer({ accountID });

  if (accountHasOperationOrTransfer) {
    throw new CustomError({ id: ACCOUNT_HAS_OPERATION_OR_TRANSFER });
  }

  if (account) {
    const { deletedAccount } = await accounts.deleteAccount({
      accountID,
      userID,
    });

    return { deletedAccount };
  }
};
