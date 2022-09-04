import { db } from "../../connect.js";
import { loadQuery } from "../../functions/load-query.js";

const readCategoriesQuery = loadQuery({
  base: import.meta.url,
  url: "./read-categories.sql",
});

export const readCategories = async ({ userID }) => {
  const categories = await db.manyOrNone(readCategoriesQuery, { userID });

  return categories;
};
