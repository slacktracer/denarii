export const endConnections = ({ db, kv }) =>
  Promise.all([db.$pool.end(), kv.quit()]);
