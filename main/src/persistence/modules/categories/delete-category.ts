import { db } from "../../connect.js";
import { loadQuery } from "../../functions/load-query.js";

const deleteCategoryQuery = loadQuery({
  base: import.meta.url,
  url: "./delete-category.sql",
});

export const deleteCategory = ({ categoryID, userID }) =>
  db.none(deleteCategoryQuery, { categoryID, userID });
