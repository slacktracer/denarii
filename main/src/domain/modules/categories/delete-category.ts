import { categories } from "../../../persistence/persistence.js";
import { CustomError } from "../../custom-error.js";
import { NO_SUCH_CATEGORY } from "../../data/errors.js";

export const deleteCategory = async ({ categoryID, userID }) => {
  const category = await categories.readCategory({ categoryID, userID });

  const noSuchCategory = category ?? true;

  if (noSuchCategory === true) {
    throw new CustomError({ id: NO_SUCH_CATEGORY });
  }

  if (category) {
    const { deletedCategory } = await categories.deleteCategory({
      categoryID,
      userID,
    });

    return { deletedCategory };
  }
};
