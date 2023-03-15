import bcrypt from "bcrypt";

import { db } from "../../connect.js";

export const updateUser = async ({ data }) => {
  const { userID, password, ...update } = data;

  if (password !== undefined) {
    const hashedPassword = await bcrypt.hash(password, 10);

    update.password = hashedPassword;
  }

  const updatedUser = await db.user.update({
    data: {
      ...update,
    },
    where: { userID },
  });

  return updatedUser;
};
