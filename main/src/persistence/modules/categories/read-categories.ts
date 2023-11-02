import { db } from "../../connect.js";

export const readCategories = async ({ userID }) => {
  const categories = await db.category.findMany({
    include: {
      group: {
        select: {
          groupID: true,
          name: true,
        },
      },
    },
    orderBy: { name: "asc" },
    where: { userID },
  });

  return categories;
};
