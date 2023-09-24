import { categories } from "../../../../domain/domain.js";

const { readCategory } = categories;

export const getCategoryByID = async (request, response) => {
  const { userID } = request.session.user;

  const { categoryID } = request.params;

  const category = await readCategory({ categoryID, userID });

  response.json(category);
};
