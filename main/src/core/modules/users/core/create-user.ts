import bcrypt from "bcrypt";

import { db, loadQuery } from "../../../../persistence/persistence.js";

const createUserQuery = loadQuery({
  base: import.meta.url,
  url: "./create-user.sql",
});

export const createUser = async ({ data }) => {
  const { email, password, username } = data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const createdUser = db.one(createUserQuery, {
    email,
    password: hashedPassword,
    username,
  });

  return createdUser;
};
