import { db } from "../../connect.js";

export const readUser = async ({ userID }) => {
  const user = await db.user.findFirst({
    where: {
      userID,
    },
  });

  return user;
};
