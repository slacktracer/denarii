import { db } from "../../connect.js";
import { loadQuery } from "../../functions/load-query.js";

const readTagsQuery = loadQuery({
  base: import.meta.url,
  url: "./read-tags.sql",
});

export const readTags = async ({ userID }) => {
  const tags = await db.manyOrNone(readTagsQuery, { userID });

  return tags;
};
