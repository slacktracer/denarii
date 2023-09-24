import { db } from "../../connect.js";

export const readCategory = async ({ categoryID, userID }) => {
  const category = await db.category.findFirst({
    where: {
      categoryID,
      userID,
    },
  });

  return category;
};
