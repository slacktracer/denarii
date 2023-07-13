import { PrismaClient } from "@prisma/client";
import { createClient as createRedisClient } from "redis";

export const db = new PrismaClient({ errorFormat: "pretty" });

export const redisClient = createRedisClient({
  url: process.env.REDIS_CONNECTION_STRING || "",
});

await redisClient.connect().catch(console.error);
