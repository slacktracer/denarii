import { setCustomColumnNamesTransformations } from "../../functions/set-custom-column-names-transformations.js";

setCustomColumnNamesTransformations(["account_id", "accountID"]);
setCustomColumnNamesTransformations(["category_id", "categoryID"]);
setCustomColumnNamesTransformations(["group_id", "groupID"]);
setCustomColumnNamesTransformations(["operation_id", "operationID"]);
setCustomColumnNamesTransformations(["user_id", "userID"]);

export * from "./core/create-operation.js";
export * from "./core/delete-operation.js";
export * from "./core/read-operation.js";
export * from "./core/read-operations.js";
export * from "./core/update-operation.js";
