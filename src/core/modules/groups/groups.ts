import { setCustomColumnNamesTransformations } from "../../../persistence/set-custom-column-names-transformations.js";

setCustomColumnNamesTransformations(["group_id", "groupID"]);
setCustomColumnNamesTransformations(["user_id", "userID"]);

export * from "./core/create-group.js";
export * from "./core/delete-group.js";
export * from "./core/read-group.js";
export * from "./core/read-groups.js";
export * from "./core/update-group.js";
