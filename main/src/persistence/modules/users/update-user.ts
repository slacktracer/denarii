import bcrypt from "bcrypt";

import { db, loadQuery } from "../../persistence.js";

const updateUserQuery = loadQuery({
  base: import.meta.url,
  url: "./update-user.sql",
});

export const updateUser = async ({ data }) => {
  const { userID, password, ...update } = data;

  if (password !== undefined) {
    const hashedPassword = await bcrypt.hash(password, 10);

    update.password = hashedPassword;
  }
  const sets = db.$config.pgp.helpers.sets(update);

  const updatedUser = await db.one(updateUserQuery, {
    userID,
    sets,
  });

  return updatedUser;
};
