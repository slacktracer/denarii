import { db } from "../../connect.js";
import { loadQuery } from "../../functions/load-query.js";

const readTagValueQuery = loadQuery({
  base: import.meta.url,
  url: "./read-tag-value.sql",
});

export const readTagValue = async ({ tagValueID, userID }) => {
  const tagValue = await db.oneOrNone(readTagValueQuery, {
    tagValueID,
    userID,
  });

  return tagValue;
};
