import { categories } from "../../../persistence/persistence.js";

export const readCategories = ({ userID }) =>
  categories.readCategories({ userID });
