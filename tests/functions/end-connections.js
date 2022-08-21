export const endConnections = ({ db, kv, redisServer }) =>
  Promise.all([db.$pool.end(), kv?.quit(), redisServer?.stop()]);
