import { createClient as createRedisClient } from "redis";

import { createDatabaseClient } from "./create-database-client.js";

// Remember, Thiago, this file has a mock for the tests!
// tests/mocks/persistence/connect.js
export const db = createDatabaseClient();

export const redisClient = createRedisClient({
  url: process.env.REDIS_CONNECTION_STRING || "",
});

await redisClient.connect().catch(console.error);
