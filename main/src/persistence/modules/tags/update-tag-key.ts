import { db } from "../../connect.js";

export const updateTagKey = async ({ tagKeyID, data, userID }) => {
  const { ...update } = data;

  const updatedTagKey = await db.tagKey.update({
    data: { ...update },
    where: {
      tagKeyID,
      userID,
    },
  });

  return updatedTagKey;
};
