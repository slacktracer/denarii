import { db } from "../../connect.js";
import { loadQuery } from "../../functions/load-query.js";

const readGroupsQuery = loadQuery({
  base: import.meta.url,
  url: "./read-groups.sql",
});

export const readGroups = async ({ userID }) => {
  const groups = await db.manyOrNone(readGroupsQuery, { userID });

  return groups;
};
