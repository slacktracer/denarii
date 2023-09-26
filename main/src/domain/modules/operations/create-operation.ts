import {
  accounts,
  categories,
  operations,
} from "../../../persistence/persistence.js";
import { CustomError } from "../../custom-error.js";
import { NO_SUCH_ACCOUNT, NO_SUCH_CATEGORY } from "../../data/errors.js";

export const createOperation = async ({ data, userID }) => {
  const account = await accounts.readAccount({
    accountID: data.accountID,
    userID,
  });

  const noSuchAccount = account ?? true;

  if (noSuchAccount === true) {
    throw new CustomError({ id: NO_SUCH_ACCOUNT });
  }

  const category = await categories.readCategory({
    categoryID: data.categoryID,
    userID,
  });

  const noSuchCategory = category ?? true;

  if (noSuchCategory === true) {
    throw new CustomError({ id: NO_SUCH_CATEGORY });
  }

  return operations.createOperation({
    data,
    userID,
  });
};
