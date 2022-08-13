import { db } from "../../../../persistence/persistence.js";
import { loadQuery } from "../../../../persistence/load-query.js";

const deleteCategoryQuery = loadQuery({
  base: import.meta.url,
  url: "./delete-category.sql",
});

export const deleteCategory = ({ categoryID, userID }) =>
  db.none(deleteCategoryQuery, { categoryID, userID });
