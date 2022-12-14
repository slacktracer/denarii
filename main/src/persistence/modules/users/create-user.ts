import bcrypt from "bcrypt";

import { db } from "../../connect.js";
import { loadQuery } from "../../functions/load-query.js";

const createUserQuery = loadQuery({
  base: import.meta.url,
  url: "./create-user.sql",
});

export const createUser = async ({ data }) => {
  const { email, password, username } = data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const createdUser = db.one(createUserQuery, {
    createdAt: new Date(),
    email,
    password: hashedPassword,
    username,
  });

  return createdUser;
};
