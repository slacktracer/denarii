import { db } from "../../connect.js";

export const deleteGroup = async ({ groupID, userID }) => {
  const result = await db.group.update({
    data: { deleted: true },
    where: {
      groupID,
      userID,
    },
  });

  return { deletedGroup: result };
};
