import { db } from "../../connect.js";

export const deleteCategory = async ({ categoryID, userID }) => {
  const result = await db.category.update({
    data: { deleted: true },
    where: {
      categoryID,
      userID,
    },
  });

  return { deletedCategory: result };
};
