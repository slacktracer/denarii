import { setCustomColumnNamesTransformations } from "../../../persistence/functions/set-custom-column-names-transformations.js";

setCustomColumnNamesTransformations(["user_id", "userID"]);

export * from "./core/create-user.js";
export * from "./core/delete-user.js";
export * from "./core/read-user.js";
export * from "./core/read-users.js";
export * from "./core/update-user.js";
