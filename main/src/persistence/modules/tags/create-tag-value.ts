import type { createTagValueParameter } from "../../../types.js";
import { db } from "../../connect.js";
import { loadQuery } from "../../functions/load-query.js";

const createTagValueQuery = loadQuery({
  base: import.meta.url,
  url: "./create-tag-value.sql",
});

export const createTagValue = async ({
  data,
  userID,
}: createTagValueParameter) => {
  const { name } = data;

  const createdTagValue = db.one(createTagValueQuery, {
    createdAt: new Date(),
    name,
    userID,
  });

  return createdTagValue;
};
