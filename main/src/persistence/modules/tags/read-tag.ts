import { db } from "../../connect.js";
import { loadQuery } from "../../functions/load-query.js";

const readTagQuery = loadQuery({
  base: import.meta.url,
  url: "./read-tag.sql",
});

export const readTag = async ({ tagID, userID }) => {
  const tag = await db.oneOrNone(readTagQuery, { tagID, userID });

  return tag;
};
