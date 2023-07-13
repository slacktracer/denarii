import RedisStore from "connect-redis";

import { redisClient } from "../domain/domain.js";

export const sessionStore = new RedisStore({ client: redisClient });
