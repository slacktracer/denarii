import { db } from "../../connect.js";

export const readCategories = async ({ userID }) => {
  const categories = await db.category.findMany({
    orderBy: { name: "asc" },
    where: { userID },
  });

  return categories;
};
