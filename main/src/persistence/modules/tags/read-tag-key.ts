import { db } from "../../connect.js";

export const readTagKey = async ({ tagKeyID, userID }) => {
  const tagKey = await db.tagKey.findFirst({
    where: {
      tagKeyID,
      userID,
    },
  });

  return tagKey;
};
