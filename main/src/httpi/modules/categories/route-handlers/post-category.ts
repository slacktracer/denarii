import {
  categories,
  CustomError,
  NO_SUCH_GROUP,
  tryCatch,
  UNKNOWN_ERROR,
} from "../../../../domain/domain.js";
import { print } from "../../../objects/print.js";

const { createCategory } = categories;

export const postCategory = async (request, response) => {
  const { userID } = request.session.user;

  const { groupID, name } = request.body;

  const data = { groupID, name };

  const result = await tryCatch(createCategory, { data, userID });

  console.log(result);

  if (result instanceof Error === false) {
    response.json(result);

    return;
  }

  if (result instanceof CustomError) {
    if (result.data.id === NO_SUCH_GROUP) {
      response.status(404).json({ message: NO_SUCH_GROUP.description });

      return;
    }
  }

  print.warn(UNKNOWN_ERROR);
  print.error(result);

  response.status(500).end();
};
