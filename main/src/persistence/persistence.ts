import { createClient } from "redis";

import { customColumnNamesTransformations } from "./data/custom-column-names-transformations.js";
import { setCustomColumnNamesTransformations } from "./functions/set-custom-column-names-transformations.js";

export { customPGPHelpersSets } from "./functions/custom-pgp-helpers-sets.js";

export * from "./connect.js";

export { loadQuery } from "./functions/load-query.js";

export { createClient as createRedisClient };

setCustomColumnNamesTransformations(customColumnNamesTransformations);
