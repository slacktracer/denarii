import { db } from "../../connect.js";
import { customPGPHelpersSets } from "../../functions/custom-pgp-helpers-sets.js";
import { loadQuery } from "../../functions/load-query.js";

const updateTagValueQuery = loadQuery({
  base: import.meta.url,
  url: "./update-tag-value.sql",
});

export const updateTagValue = async ({ tagValueID, data, userID }) => {
  const { ...update } = data;

  const sets = customPGPHelpersSets(update);

  const updatedTagValue = await db.one(updateTagValueQuery, {
    tagValueID,
    sets,
    userID,
  });

  return updatedTagValue;
};
