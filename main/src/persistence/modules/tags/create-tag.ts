import type { createTagParameter } from "../../../types.js";
import { db } from "../../connect.js";
import { loadQuery } from "../../functions/load-query.js";

const createTagQuery = loadQuery({
  base: import.meta.url,
  url: "./create-tag.sql",
});

export const createTag = async ({ data, userID }: createTagParameter) => {
  const { operationID, tagKeyID, tagValueID } = data;

  const createdTag = db.one(createTagQuery, {
    createdAt: new Date(),
    operationID,
    tagKeyID,
    tagValueID,
    userID,
  });

  return createdTag;
};
