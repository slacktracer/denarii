import { PrismaClient } from "@prisma/client";
import { createClient as createRedisClient } from "redis";
import { RedisMemoryServer } from "redis-memory-server";

export const db = new PrismaClient({ errorFormat: "pretty" });

export const redisServer = new RedisMemoryServer();

const host = await redisServer.getHost();
const port = await redisServer.getPort();

process.env.REDIS_CONNECTION_STRING = `redis://${host}:${port}`;

export const redisClient = createRedisClient({
  url: process.env.REDIS_CONNECTION_STRING,
});

await redisClient.connect().catch(console.error);
