import { db, loadQuery } from "../../../persistence.js";

const deleteCategoryQuery = loadQuery({
  base: import.meta.url,
  url: "./delete-category.sql",
});

export const deleteCategory = ({ categoryID, userID }) =>
  db.none(deleteCategoryQuery, { categoryID, userID });
