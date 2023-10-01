import { accounts } from "../../../persistence/persistence.js";
import { CustomError } from "../../custom-error.js";
import { NO_SUCH_FROM_ACCOUNT, NO_SUCH_TO_ACCOUNT } from "../../data/errors.js";

export const validateRelatedEntities = async ({
  fromAccountID,
  toAccountID,
  userID,
}) => {
  if (fromAccountID) {
    const accountExists = await accounts.doesAccountExists({
      accountID: fromAccountID,
      userID,
    });

    if (accountExists === false) {
      throw new CustomError({ id: NO_SUCH_FROM_ACCOUNT });
    }
  }

  if (toAccountID) {
    const accountExists = await accounts.doesAccountExists({
      accountID: toAccountID,
      userID,
    });

    if (accountExists === false) {
      throw new CustomError({ id: NO_SUCH_TO_ACCOUNT });
    }
  }
};
