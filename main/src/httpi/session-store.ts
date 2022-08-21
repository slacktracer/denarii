import connectRedis from "connect-redis";
import expressSession from "express-session";

import { createRedisClient } from "../persistence/persistence.js";

export const legacyRedisClient = createRedisClient({
  legacyMode: true,
  url: process.env.REDIS_CONNECTION_STRING,
});

await legacyRedisClient.connect().catch(console.error);

const RedisStore = connectRedis(expressSession);

export const sessionStore = new RedisStore({ client: legacyRedisClient });
