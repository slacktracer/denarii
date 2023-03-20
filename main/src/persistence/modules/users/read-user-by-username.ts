import { db } from "../../connect.js";

export const readUserByUsername = async ({ username }) => {
  console.log("username", username);

  try {
    const user = await db.user.findUnique({ where: { username } });

    return user;
  } catch (error) {
    console.log(error);

    const user = await db.user.findFirst({ where: { username } });
    console.log("user again", user);

    return {};
  }
};
