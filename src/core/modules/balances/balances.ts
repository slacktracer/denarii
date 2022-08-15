import { setCustomColumnNamesTransformations } from "../../../persistence/set-custom-column-names-transformations.js";

setCustomColumnNamesTransformations(["account_id", "accountID"]);
// setCustomColumnNamesTransformations(["user_id", "userID"]);

export * from "./core/calculate-balances.js";
