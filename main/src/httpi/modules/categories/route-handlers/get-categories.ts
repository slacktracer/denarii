import { categories } from "../../../../domain/domain.js";

const { readCategories } = categories;

export const getCategories = async (request, response) => {
  const { userID } = request.session.user;

  const categories = await readCategories({ userID });

  response.json(categories);
};
