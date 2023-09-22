import { db } from "../../connect.js";

export const updateGroup = async ({ groupID, data, userID }) => {
  const { ...update } = data;

  const updatedGroup = await db.group.update({
    data: { ...update },
    where: {
      groupID,
      userID,
    },
  });

  return updatedGroup;
};
