import {
  db,
  legacyRedisClient,
  redisServer,
} from "../mocks/persistence/connect.js";

export const disconnect = () =>
  Promise.all([
    db.$pool.end(),
    legacyRedisClient.disconnect(),
    redisServer.stop(),
  ]);
