import initPGPromise from "pg-promise";
import { createClient } from "redis";

import { setCustomColumnNamesTransformations } from "./functions/set-custom-column-names-transformations.js";
import { transformColumnNames } from "./functions/transform-column-names.js";

const pgp = initPGPromise();

const options = process.env.LOCAL === "yes" ? { ssl: true } : {};

export const db = pgp(options);

db.$config.options.receive = transformColumnNames;

export { customPGPHelpersSets } from "./functions/custom-pgp-helpers-sets.js";

export { loadQuery } from "./functions/load-query.js";

export { createClient as createRedisClient };

setCustomColumnNamesTransformations(["account_id", "accountID"]);
setCustomColumnNamesTransformations(["category_id", "categoryID"]);
setCustomColumnNamesTransformations(["from_account_id", "fromAccountID"]);
setCustomColumnNamesTransformations(["group_id", "groupID"]);
setCustomColumnNamesTransformations(["operation_id", "operationID"]);
setCustomColumnNamesTransformations(["to_account_id", "toAccountID"]);
setCustomColumnNamesTransformations(["transfer_id", "transferID"]);
setCustomColumnNamesTransformations(["user_id", "userID"]);
