import {
  categories,
  CustomError,
  NO_SUCH_CATEGORY,
  tryCatch,
  UNKNOWN_ERROR,
} from "../../../../domain/domain.js";
import { print } from "../../../objects/print.js";

const { deleteCategory } = categories;

export const deleteCategoryByID = async (request, response) => {
  const { userID } = request.session.user;

  const { categoryID } = request.params;

  const result = await tryCatch(deleteCategory, {
    categoryID,
    userID,
  });

  if (result instanceof Error === false) {
    response.json(result);

    return;
  }

  if (result instanceof CustomError) {
    if (result.data.id === NO_SUCH_CATEGORY) {
      response.status(404).send({ message: NO_SUCH_CATEGORY.description });

      return;
    }
  }

  print.warn(UNKNOWN_ERROR);
  print.error(result);

  response.status(500).end();
};
