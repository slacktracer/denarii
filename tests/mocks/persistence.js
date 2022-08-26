import { DataType, newDb } from "pg-mem";
import pgp from "pg-promise";
import { createClient } from "redis";
import { RedisMemoryServer } from "redis-memory-server";
import { URL } from "url";
import { v4 as uuid } from "uuid";

const { transformColumnNames } = await import(
  `../../main/src/persistence/transform-column-names.js`
);

export const pgm = await newDb();

pgm.public.registerFunction({
  args: [],
  implementation: () => uuid(),
  name: "gen_random_uuid",
  returns: DataType.uuid,
});

export const db = pgm.adapters.createPgPromise();

db.$config.options.receive = transformColumnNames;

export { customPGPHelpersSets } from "../../main/src/persistence/custom-pgp-helpers-sets.js";

const { QueryFile } = pgp;

const { makeLoadQuery } = await import(
  `../../main/src/persistence/load-query.js`
);

export const loadQuery = makeLoadQuery({ QueryFile, URL });

export const redisServer = new RedisMemoryServer();

const host = await redisServer.getHost();
const port = await redisServer.getPort();

process.env.REDIS_CONNECTION_STRING = `redis://${host}:${port}`;

export { createClient as createRedisClient };
