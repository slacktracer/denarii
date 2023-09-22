import { randomUUID } from "crypto";

import type { createGroupParameter } from "../../../types.js";
import { db } from "../../connect.js";

export const createGroup = async ({ data, userID }: createGroupParameter) => {
  const { name } = data;

  const createdGroup = db.group.create({
    data: {
      createdAt: new Date(),
      name,
      groupID: randomUUID(),
      userID,
    },
  });

  return createdGroup;
};
