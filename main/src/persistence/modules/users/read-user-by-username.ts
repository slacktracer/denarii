import { db } from "../../connect.js";
import { loadQuery } from "../../functions/load-query.js";

const readUserByUsernameQuery = loadQuery({
  base: import.meta.url,
  url: "./read-user-by-username.sql",
});

export const readUserByUsername = async ({ password, username }) => {
  const user = await db.oneOrNone(readUserByUsernameQuery, {
    password,
    username,
  });

  return user;
};
