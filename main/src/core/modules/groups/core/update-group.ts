import { db, loadQuery } from "../../../../persistence/persistence.js";

const updateGroupQuery = loadQuery({
  base: import.meta.url,
  url: "./update-group.sql",
});

export const updateGroup = async ({ groupID, data, userID }) => {
  const { ...update } = data;

  const sets = db.$config.pgp.helpers.sets(update);

  const updatedGroup = await db.one(updateGroupQuery, {
    groupID,
    sets,
    userID,
  });

  return updatedGroup;
};
