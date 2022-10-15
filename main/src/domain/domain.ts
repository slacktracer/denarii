export { CustomError } from "./custom-error.js";
export * from "./data/errors.js";
export { tryCatch } from "./functions/try-catch.js";

import { createAccount } from "./modules/accounts/create-account.js";
import { deleteAccount } from "./modules/accounts/delete-account.js";
import { readAccount } from "./modules/accounts/read-account.js";
import { readAccounts } from "./modules/accounts/read-accounts.js";
import { updateAccount } from "./modules/accounts/update-account.js";

export const accounts = {
  createAccount,
  deleteAccount,
  readAccount,
  readAccounts,
  updateAccount,
};

import { createUser } from "./modules/users/create-user.js";
import { deleteUser } from "./modules/users/delete-user.js";
import { readUser } from "./modules/users/read-user.js";
import { readUserByUsername } from "./modules/users/read-user-by-username.js";
import { readUsers } from "./modules/users/read-users.js";
import { updateUser } from "./modules/users/update-user.js";

export const users = {
  createUser,
  deleteUser,
  readUser,
  readUserByUsername,
  readUsers,
  updateUser,
};
