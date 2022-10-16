import { db } from "../../connect.js";
import { customPGPHelpersSets } from "../../functions/custom-pgp-helpers-sets.js";
import { loadQuery } from "../../functions/load-query.js";

const updateTagQuery = loadQuery({
  base: import.meta.url,
  url: "./update-tag.sql",
});

export const updateTag = async ({ tagID, data, userID }) => {
  const { ...update } = data;

  const sets = customPGPHelpersSets(update);

  const updatedTag = await db.one(updateTagQuery, {
    tagID,
    sets,
    userID,
  });

  return updatedTag;
};
