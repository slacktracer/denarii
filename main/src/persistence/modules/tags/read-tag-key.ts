import { db } from "../../connect.js";
import { loadQuery } from "../../functions/load-query.js";

const readTagKeyQuery = loadQuery({
  base: import.meta.url,
  url: "./read-tag-key.sql",
});

export const readTagKey = async ({ tagKeyID, userID }) => {
  const tagKey = await db.oneOrNone(readTagKeyQuery, { tagKeyID, userID });

  return tagKey;
};
