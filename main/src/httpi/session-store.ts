import connectRedis from "connect-redis";
import expressSession from "express-session";
import { createClient } from "redis";

const redisClient = createClient({
  legacyMode: true,
  url: process.env.REDIS_CONNECTION_STRING,
});

await redisClient.connect().catch(console.error);

const RedisStore = connectRedis(expressSession);

export const sessionStore = new RedisStore({ client: redisClient });
