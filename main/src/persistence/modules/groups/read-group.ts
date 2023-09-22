import { db } from "../../connect.js";

export const readGroup = async ({ groupID, userID }) => {
  const group = await db.group.findFirst({
    where: {
      groupID,
      userID,
    },
  });

  return group;
};
