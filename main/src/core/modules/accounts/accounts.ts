import { setCustomColumnNamesTransformations } from "../../../persistence/set-custom-column-names-transformations.js";

setCustomColumnNamesTransformations(["account_id", "accountID"]);
setCustomColumnNamesTransformations(["user_id", "userID"]);

export * from "./core/create-account.js";
export * from "./core/delete-account.js";
export * from "./core/read-account.js";
export * from "./core/read-accounts.js";
export * from "./core/update-account.js";
