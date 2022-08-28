import { db, loadQuery } from "../../../persistence.js";

const readGroupQuery = loadQuery({
  base: import.meta.url,
  url: "./read-group.sql",
});

export const readGroup = async ({ groupID, userID }) => {
  const group = await db.oneOrNone(readGroupQuery, { groupID, userID });

  return group;
};
