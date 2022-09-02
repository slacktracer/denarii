import connectRedis from "connect-redis";
import expressSession from "express-session";

import { legacyRedisClient } from "../persistence/persistence.js";

const RedisStore = connectRedis(expressSession);

export const sessionStore = new RedisStore({ client: legacyRedisClient });
