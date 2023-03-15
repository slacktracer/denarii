import { db } from "../../connect.js";

export const readUserByUsername = async ({ password, username }) => {
  const user = await db.user.findUnique({ where: { username } });

  return user;
};
