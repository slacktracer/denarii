import { db } from "../../connect.js";

export const deleteTagValue = async ({ tagValueID, userID }) => {
  const result = await db.tagValue.update({
    data: { deleted: true },
    where: {
      tagValueID,
      userID,
    },
  });

  return { deletedTagValue: result };
};
