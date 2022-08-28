import { setCustomColumnNamesTransformations } from "../../../persistence/functions/set-custom-column-names-transformations.js";

setCustomColumnNamesTransformations(["category_id", "categoryID"]);
setCustomColumnNamesTransformations(["group_id", "groupID"]);
setCustomColumnNamesTransformations(["user_id", "userID"]);

export * from "./core/create-category.js";
export * from "./core/delete-category.js";
export * from "./core/read-category.js";
export * from "./core/read-categories.js";
export * from "./core/update-category.js";
