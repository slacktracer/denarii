import { createUser } from "./create-user.js";
import { deleteUser } from "./delete-user.js";
import { readUser } from "./read-user.js";
import { readUsers } from "./read-users.js";
import { updateUser } from "./update-user.js";
import { readUserByUsername } from "./read-user-by-username.js";

export const users = {
  createUser,
  deleteUser,
  readUser,
  readUserByUsername,
  readUsers,
  updateUser,
};
