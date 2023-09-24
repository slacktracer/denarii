import { categories } from "../../../persistence/persistence.js";

export const updateCategory = ({ categoryID, data, userID }) =>
  categories.updateCategory({
    categoryID,
    data,
    userID,
  });
