import { categories } from "../../../persistence/persistence.js";

export const readCategory = ({ categoryID, userID }) =>
  categories.readCategory({ categoryID, userID });
