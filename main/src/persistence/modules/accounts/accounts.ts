import { createAccount } from "./create-account.js";
import { deleteAccount } from "./delete-account.js";
import { readAccount } from "./read-account.js";
import { readAccounts } from "./read-accounts.js";
import { updateAccount } from "./update-account.js";

export const accounts = {
  createAccount,
  deleteAccount,
  readAccount,
  readAccounts,
  updateAccount,
};
