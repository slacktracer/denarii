import { db } from "../../connect.js";
import { loadQuery } from "../../functions/load-query.js";

const readTagKeysQuery = loadQuery({
  base: import.meta.url,
  url: "./read-tag-keys.sql",
});

export const readTagKeys = async ({ userID }) => {
  const tagKeys = await db.manyOrNone(readTagKeysQuery, { userID });

  return tagKeys;
};
