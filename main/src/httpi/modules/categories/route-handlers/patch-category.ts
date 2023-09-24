import { categories } from "../../../../domain/domain.js";
import { filterOutUndefinedEntries } from "../../../functions/filter-out-undefined-entries.js";

const { updateCategory } = categories;

export const patchCategory = async (request, response) => {
  const { userID } = request.session.user;

  const { categoryID } = request.params;

  const { name } = request.body;

  const data = { name };

  const updatedCategory = await updateCategory({
    categoryID,
    data: filterOutUndefinedEntries({ object: data }),
    userID,
  });

  response.json(updatedCategory);
};
