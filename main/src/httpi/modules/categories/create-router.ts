import express from "express";

import { deleteCategoryByID } from "./route-handlers/delete-category-by-id.js";
import { getCategories } from "./route-handlers/get-categories.js";
import { getCategoryByID } from "./route-handlers/get-category-by-id.js";
import { patchCategory } from "./route-handlers/patch-category.js";
import { postCategory } from "./route-handlers/post-category.js";

export const createRouter = () => {
  const categoriesRouter = express.Router();

  categoriesRouter.delete("/:categoryID", deleteCategoryByID);

  categoriesRouter.get("/", getCategories);

  categoriesRouter.get("/:categoryID", getCategoryByID);

  categoriesRouter.post("/", postCategory);

  categoriesRouter.patch("/:categoryID", patchCategory);

  return categoriesRouter;
};
