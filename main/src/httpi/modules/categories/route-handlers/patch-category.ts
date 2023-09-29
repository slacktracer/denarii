import {
  categories,
  CustomError,
  NO_SUCH_GROUP,
  tryCatch,
  UNKNOWN_ERROR,
} from "../../../../domain/domain.js";
import { filterOutUndefinedEntries } from "../../../functions/filter-out-undefined-entries.js";
import { print } from "../../../objects/print.js";

const { updateCategory } = categories;

export const patchCategory = async (request, response) => {
  const { userID } = request.session.user;

  const { categoryID } = request.params;

  const { groupID, name } = request.body;

  const data = { categoryID, groupID, name };

  const result = await tryCatch(updateCategory, {
    categoryID,
    data: filterOutUndefinedEntries({ object: data }),
    userID,
  });

  if (result instanceof Error === false) {
    response.json(result);

    return;
  }

  if (result instanceof CustomError) {
    if (result.data.id === NO_SUCH_GROUP) {
      response.status(400).json({ message: NO_SUCH_GROUP.description });

      return;
    }
  }

  print.warn(UNKNOWN_ERROR);
  print.error(result);

  response.status(500).end();
};
