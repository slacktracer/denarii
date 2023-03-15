import {
  db,
  legacyRedisClient,
  redisServer,
} from "../mocks/persistence/connect.js";

export const disconnect = () =>
  Promise.all([
    db.$disconnect(),
    legacyRedisClient.disconnect(),
    redisServer.stop(),
  ]);
