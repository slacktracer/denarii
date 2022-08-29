import { db, loadQuery } from "../../persistence.js";

const readCategoryQuery = loadQuery({
  base: import.meta.url,
  url: "./read-category.sql",
});

export const readCategory = async ({ categoryID, userID }) => {
  const category = await db.oneOrNone(readCategoryQuery, {
    categoryID,
    userID,
  });

  return category;
};
