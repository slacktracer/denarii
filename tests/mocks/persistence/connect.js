import { createClient as createRedisClient } from "redis";

import { createDatabaseClient } from "../../../main/src/persistence/create-database-client.js";

export const db = createDatabaseClient();

export const redisClient = createRedisClient({
  url: process.env.REDIS_CONNECTION_STRING,
});

await redisClient.connect().catch(console.error);
