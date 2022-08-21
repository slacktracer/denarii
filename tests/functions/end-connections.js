export const endConnections = ({ db, kv, legacyRedisClient, redisServer }) =>
  Promise.all([
    db.$pool.end(),
    kv?.quit(),
    legacyRedisClient?.disconnect(),
    redisServer?.stop(),
  ]);
