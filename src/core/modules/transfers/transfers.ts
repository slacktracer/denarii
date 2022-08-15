import { setCustomColumnNamesTransformations } from "../../../persistence/set-custom-column-names-transformations.js";

setCustomColumnNamesTransformations(["from_account_id", "fromAccountID"]);
setCustomColumnNamesTransformations(["to_account_id", "toAccountID"]);
setCustomColumnNamesTransformations(["transfer_id", "transferID"]);
setCustomColumnNamesTransformations(["user_id", "userID"]);

export * from "./core/create-transfer.js";
export * from "./core/delete-transfer.js";
export * from "./core/read-transfer.js";
export * from "./core/read-transfers.js";
export * from "./core/update-transfer.js";
