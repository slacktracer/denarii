import { db, loadQuery } from "../../../persistence.js";

const createGroupQuery = loadQuery({
  base: import.meta.url,
  url: "./create-group.sql",
});

export const createGroup = async ({ data, userID }) => {
  const { name } = data;

  const createdGroup = db.one(createGroupQuery, {
    createdAt: new Date(),
    name,
    userID,
  });

  return createdGroup;
};
