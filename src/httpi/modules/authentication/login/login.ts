import bcrypt from "bcrypt";

import { db, loadQuery } from "../../../../persistence/persistence.js";

const readUserByUsernameQuery = loadQuery({
  base: import.meta.url,
  url: "./read-user-by-username.sql",
});

export const login = async ({ password, username }) => {
  const user = await db.one(readUserByUsernameQuery, { password, username });

  const passwordMatches = await bcrypt.compare(password, user.password);

  delete user.password;

  if (passwordMatches === false) {
    return false;
  }

  return user;
};
