import { db } from "../../connect.js";
import { loadQuery } from "../../functions/load-query.js";

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
