import { db, loadQuery } from "../../../persistence.js";

const readUsersQuery = loadQuery({
  base: import.meta.url,
  url: "./read-users.sql",
});

export const readUsers = async () => {
  const users = await db.manyOrNone(readUsersQuery);

  return users;
};
