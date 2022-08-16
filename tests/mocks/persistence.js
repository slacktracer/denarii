import { DataType, newDb } from "pg-mem";
import pgp from "pg-promise";
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

const { QueryFile } = pgp;

const { makeLoadQuery } = await import(
  `../../main/src/persistence/load-query.js`
);

export const loadQuery = makeLoadQuery({ QueryFile, URL });

export const redisClient = {
  connect: () => Promise.resolve(),
  quit: () => undefined,
};

await redisClient.connect().catch(console.error);

export { redisClient as kv };
