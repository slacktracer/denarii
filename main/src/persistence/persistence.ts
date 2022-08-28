import initPGPromise from "pg-promise";
import { createClient } from "redis";

import { transformColumnNames } from "./functions/transform-column-names.js";

const pgp = initPGPromise();

const options = process.env.LOCAL === "yes" ? { ssl: true } : {};

export const db = pgp(options);

db.$config.options.receive = transformColumnNames;

export { customPGPHelpersSets } from "./functions/custom-pgp-helpers-sets.js";

export { loadQuery } from "./functions/load-query.js";

export { createClient as createRedisClient };
