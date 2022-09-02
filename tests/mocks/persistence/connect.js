import { DataType, newDb } from "pg-mem";
import { RedisMemoryServer } from "redis-memory-server";
import { v4 as uuid } from "uuid";

const { transformColumnNames } = await import(
  `denarii/src/persistence/functions/transform-column-names.js`
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

export const redisServer = new RedisMemoryServer();

const host = await redisServer.getHost();
const port = await redisServer.getPort();

process.env.REDIS_CONNECTION_STRING = `redis://${host}:${port}`;
