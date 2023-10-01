import { db } from "../../connect.js";

export const doesCategoryExists = ({ categoryID, userID }) =>
  db.category.exists({ categoryID, userID });
