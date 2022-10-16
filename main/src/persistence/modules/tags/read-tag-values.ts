import { db } from "../../connect.js";
import { loadQuery } from "../../functions/load-query.js";

const readTagValuesQuery = loadQuery({
  base: import.meta.url,
  url: "./read-tag-values.sql",
});

export const readTagValues = async ({ userID }) => {
  const tagValues = await db.manyOrNone(readTagValuesQuery, { userID });

  return tagValues;
};
