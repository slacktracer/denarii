import { PrismaClient } from "@prisma/client";
import { createClient as createRedisClient } from "redis";

export const db = new PrismaClient({ errorFormat: "pretty" });

export const legacyRedisClient = createRedisClient({
  legacyMode: true,
  url: process.env.REDIS_CONNECTION_STRING || "",
});

await legacyRedisClient.connect().catch(console.error);
