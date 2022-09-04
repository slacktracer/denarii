import { db } from "../../connect.js";
import { loadQuery } from "../../functions/load-query.js";

const createCategoryQuery = loadQuery({
  base: import.meta.url,
  url: "./create-category.sql",
});

export const createCategory = async ({ data, userID }) => {
  const { groupID, name } = data;

  const createdCategory = db.one(createCategoryQuery, {
    createdAt: new Date(),
    groupID,
    name,
    userID,
  });

  return createdCategory;
};
