import { db } from "../../connect.js";

export const updateCategory = async ({ categoryID, data, userID }) => {
  const { ...update } = data;

  const updatedCategory = await db.category.update({
    data: { ...update },
    where: {
      categoryID,
      userID,
    },
  });

  return updatedCategory;
};
