import { randomUUID } from "crypto";

import type { createTagKeyParameter } from "../../../types.js";
import { db } from "../../connect.js";

export const createTagKey = async ({ data, userID }: createTagKeyParameter) => {
  const { name } = data;

  const createdTagKey = db.tagKey.create({
    data: {
      createdAt: new Date(),
      name,
      tagKeyID: randomUUID(),
      userID,
    },
  });

  return createdTagKey;
};
