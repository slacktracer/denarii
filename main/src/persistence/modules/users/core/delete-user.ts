import { db, loadQuery } from "../../../persistence.js";

const deleteUserQuery = loadQuery({
  base: import.meta.url,
  url: "./delete-user.sql",
});

export const deleteUser = async ({ userID }) =>
  db.none(deleteUserQuery, { userID });
