import connectRedis from "connect-redis";
import expressSession from "express-session";

import { legacyRedisClient } from "../domain/domain.js";

const RedisStore = connectRedis(expressSession);

export const sessionStore = new RedisStore({ client: legacyRedisClient });
