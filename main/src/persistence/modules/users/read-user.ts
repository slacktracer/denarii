import { db } from "../../connect.js";
import { loadQuery } from "../../functions/load-query.js";

const readUserQuery = loadQuery({
  base: import.meta.url,
  url: "./read-user.sql",
});

export const readUser = async ({ userID }) => {
  const user = await db.oneOrNone(readUserQuery, { userID });

  return user;
};
