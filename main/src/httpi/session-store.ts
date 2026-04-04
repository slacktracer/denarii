import RedisStore from "connect-redis";

import { redisClient } from "../persistence/connect.js";

export const sessionStore = new RedisStore({ client: redisClient });
