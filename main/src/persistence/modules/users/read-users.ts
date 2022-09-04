import { db } from "../../connect.js";
import { loadQuery } from "../../functions/load-query.js";

const readUsersQuery = loadQuery({
  base: import.meta.url,
  url: "./read-users.sql",
});

export const readUsers = async () => {
  const users = await db.manyOrNone(readUsersQuery);

  return users;
};
