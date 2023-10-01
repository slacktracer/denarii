import { categories } from "../../../persistence/persistence.js";
import { validateCategoryRelatedEntities } from "./validate-category-related-entities.js";

export const updateCategory = async ({ categoryID, data, userID }) => {
  const { groupID } = data;

  await validateCategoryRelatedEntities({ groupID, userID });

  return categories.updateCategory({
    categoryID,
    data,
    userID,
  });
};
