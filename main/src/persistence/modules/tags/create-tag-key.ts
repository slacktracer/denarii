import type { createTagKeyParameter } from "../../../types.js";
import { db } from "../../connect.js";
import { loadQuery } from "../../functions/load-query.js";

const createTagKeyQuery = loadQuery({
  base: import.meta.url,
  url: "./create-tag-key.sql",
});

export const createTagKey = async ({ data, userID }: createTagKeyParameter) => {
  const { name } = data;

  const createdTagKey = db.one(createTagKeyQuery, {
    createdAt: new Date(),
    name,
    userID,
  });

  return createdTagKey;
};
