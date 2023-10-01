import { createClient as createRedisClient } from "redis";
import { RedisMemoryServer } from "redis-memory-server";

import { createDatabaseClient } from "../../../main/src/persistence/create-database-client.js";

export const db = createDatabaseClient();

export const redisServer = new RedisMemoryServer();

const host = await redisServer.getHost();
const port = await redisServer.getPort();

process.env.REDIS_CONNECTION_STRING = `redis://${host}:${port}`;

export const redisClient = createRedisClient({
  url: process.env.REDIS_CONNECTION_STRING,
});

await redisClient.connect().catch(console.error);
