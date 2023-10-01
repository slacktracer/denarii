import { accounts, categories } from "../../../persistence/persistence.js";
import { CustomError } from "../../custom-error.js";
import { NO_SUCH_ACCOUNT, NO_SUCH_CATEGORY } from "../../data/errors.js";

export const validateOperationRelatedEntities = async ({
  accountID,
  categoryID,
  userID,
}) => {
  if (accountID) {
    const accountExists = await accounts.doesAccountExists({
      accountID,
      userID,
    });

    if (accountExists === false) {
      throw new CustomError({ id: NO_SUCH_ACCOUNT });
    }
  }

  if (categoryID) {
    const categoryExists = await categories.doesCategoryExists({
      categoryID,
      userID,
    });

    if (categoryExists === false) {
      throw new CustomError({ id: NO_SUCH_CATEGORY });
    }
  }
};
