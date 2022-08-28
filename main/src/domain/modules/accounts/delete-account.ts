import * as accounts from "../../../core/modules/accounts/accounts.js";
import { CustomError } from "../../custom-error.js";
import { NO_SUCH_ACCOUNT } from "../../errors.js";

export const deleteAccount = async ({ accountID, userID }) => {
  const account = await accounts.readAccount({ accountID, userID });

  const noSuchAccount = account ?? true;

  if (noSuchAccount === true) {
    throw new CustomError({ id: NO_SUCH_ACCOUNT });
  }

  if (account) {
    const { deletedRowsCount } = await accounts.deleteAccount({
      accountID,
      userID,
    });

    return { deletedRowsCount };
  }
};
