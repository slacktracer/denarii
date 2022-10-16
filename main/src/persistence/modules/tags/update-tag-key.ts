import { db } from "../../connect.js";
import { customPGPHelpersSets } from "../../functions/custom-pgp-helpers-sets.js";
import { loadQuery } from "../../functions/load-query.js";

const updateTagKeyQuery = loadQuery({
  base: import.meta.url,
  url: "./update-tag-key.sql",
});

export const updateTagKey = async ({ tagKeyID, data, userID }) => {
  const { ...update } = data;

  const sets = customPGPHelpersSets(update);

  const updatedTagKey = await db.one(updateTagKeyQuery, {
    tagKeyID,
    sets,
    userID,
  });

  return updatedTagKey;
};
