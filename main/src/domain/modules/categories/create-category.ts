import { categories } from "../../../persistence/persistence.js";
import { validateCategoryRelatedEntities } from "./validate-category-related-entities.js";

export const createCategory = async ({ data, userID }) => {
  const { groupID } = data;

  await validateCategoryRelatedEntities({ groupID, userID });

  return categories.createCategory({
    data,
    userID,
  });
};
