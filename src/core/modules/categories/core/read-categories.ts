import { db, loadQuery } from "../../../../persistence/persistence.js";

const readCategoriesQuery = loadQuery({
  base: import.meta.url,
  url: "./read-categories.sql",
});

export const readCategories = async ({ userID }) => {
  const categories = await db.manyOrNone(readCategoriesQuery, { userID });

  return categories;
};
