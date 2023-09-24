import { db } from "../../connect.js";

export const readCategories = async ({ userID }) => {
  const categories = await db.category.findMany({ where: { userID } });

  return categories;
};
