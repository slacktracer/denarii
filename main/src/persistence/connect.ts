import initPGPromise from "pg-promise";
import { createClient as createRedisClient } from "redis";

import "./setup.js";

import { transformColumnNames } from "./functions/transform-column-names.js";

const pgp = initPGPromise();

const options = process.env.LOCAL === "yes" ? { ssl: true } : {};

export const db = pgp(options);

db.$config.options.receive = transformColumnNames;

export const legacyRedisClient = createRedisClient({
  legacyMode: true,
  url: process.env.REDIS_CONNECTION_STRING,
});

await legacyRedisClient.connect().catch(console.error);
