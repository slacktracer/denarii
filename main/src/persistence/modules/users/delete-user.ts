import { db } from "../../connect.js";

export const deleteUser = async ({ userID }) => {
  const result = await db.user.update({
    data: { deleted: true },
    where: { userID },
  });

  return { deletedUser: result };
};
