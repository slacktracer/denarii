import { randomUUID } from "crypto";

import type { createCategoryParameter } from "../../../types.js";
import { db } from "../../connect.js";

export const createCategory = async ({
  data,
  userID,
}: createCategoryParameter) => {
  const { groupID, name } = data;

  const createdCategory = db.category.create({
    data: {
      categoryID: randomUUID(),
      createdAt: new Date(),
      groupID,
      name,
      userID,
    },
  });

  return createdCategory;
};
