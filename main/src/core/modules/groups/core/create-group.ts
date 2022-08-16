import { db, loadQuery } from "../../../../persistence/persistence.js";

const createGroupQuery = loadQuery({
  base: import.meta.url,
  url: "./create-group.sql",
});

export const createGroup = async ({ data, userID }) => {
  const { name } = data;

  const createdGroup = db.one(createGroupQuery, { name, userID });

  return createdGroup;
};
