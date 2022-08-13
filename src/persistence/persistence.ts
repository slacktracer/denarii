import { DataType, newDb } from "pg-mem";
import initPGPromise from "pg-promise";
import { createClient } from "redis";
import { v4 as uuid } from "uuid";

import { transformColumnNames } from "./transform-column-names.js";

const pgp = initPGPromise();

const options = process.env.LOCAL === "yes" ? { ssl: true } : {};

export let pgm;

if (process.env.USE_MEMORY_DATABASE === "yes") {
  pgm = await newDb();

  pgm.public.registerFunction({
    args: [],
    implementation: () => uuid(),
    name: "gen_random_uuid",
    returns: DataType.uuid,
  });
}

export const db =
  process.env.USE_MEMORY_DATABASE === "yes"
    ? pgm.adapters.createPgPromise()
    : pgp(options);

db.$config.options.receive = transformColumnNames;

export { loadQuery } from "./load-query.js";

export const redisClient =
  process.env.USE_MEMORY_DATABASE !== "yes"
    ? createClient({
        url: process.env.REDIS_CONNECTION_STRING,
      })
    : { connect: () => Promise.resolve(), quit: () => void 0 };

await redisClient.connect().catch(console.error);

export { redisClient as kv };
