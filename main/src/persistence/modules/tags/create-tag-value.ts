import { randomUUID } from "crypto";

import type { createTagValueParameter } from "../../../types.js";
import { db } from "../../connect.js";

export const createTagValue = async ({
  data,
  userID,
}: createTagValueParameter) => {
  const { name } = data;

  const createdTagValue = db.tagValue.create({
    data: {
      createdAt: new Date(),
      name,
      tagValueID: randomUUID(),
      userID,
    },
  });

  return createdTagValue;
};
