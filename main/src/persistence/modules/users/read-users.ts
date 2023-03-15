import { db } from "../../connect.js";

export const readUsers = async () => {
  const users = await db.user.findMany();

  return users;
};
