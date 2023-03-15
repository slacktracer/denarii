import { db } from "../../connect.js";

export const deleteTagKey = async ({ tagKeyID, userID }) => {
  const result = await db.tagKey.update({
    data: { deleted: true },
    where: {
      tagKeyID,
      userID,
    },
  });

  return { deletedTagKey: result };
};
