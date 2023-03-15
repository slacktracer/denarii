import { db } from "../../connect.js";

export const readTagValue = async ({ tagValueID, userID }) => {
  const tagValue = await db.tagValue.findFirst({
    where: {
      tagValueID,
      userID,
    },
  });

  return tagValue;
};
