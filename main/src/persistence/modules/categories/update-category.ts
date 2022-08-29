import { db, loadQuery } from "../../persistence.js";

const updateCategoryQuery = loadQuery({
  base: import.meta.url,
  url: "./update-category.sql",
});

export const updateCategory = async ({ categoryID, data, userID }) => {
  const { ...update } = data;

  const sets = db.$config.pgp.helpers.sets(update);

  const updatedCategory = await db.one(updateCategoryQuery, {
    categoryID,
    sets,
    userID,
  });

  return updatedCategory;
};
