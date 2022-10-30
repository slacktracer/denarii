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

import { createOperation } from "./modules/operations/create-operation.js";
import { deleteOperation } from "./modules/operations/delete-operation.js";
import { readOperation } from "./modules/operations/read-operation.js";
import { readOperations } from "./modules/operations/read-operations.js";
import { updateOperation } from "./modules/operations/update-operation.js";

export const operations = {
  createOperation,
  deleteOperation,
  readOperation,
  readOperations,
  updateOperation,
};

import { createTagKey } from "./modules/tags/create-tag-key.js";
import { createTagValue } from "./modules/tags/create-tag-value.js";
import { deleteTagKey } from "./modules/tags/delete-tag-key.js";
import { deleteTagValue } from "./modules/tags/delete-tag-value.js";
import { readTagKey } from "./modules/tags/read-tag-key.js";
import { readTagKeys } from "./modules/tags/read-tag-keys.js";
import { readTagValue } from "./modules/tags/read-tag-value.js";
import { readTagValues } from "./modules/tags/read-tag-values.js";
import { updateTagKey } from "./modules/tags/update-tag-key.js";
import { updateTagValue } from "./modules/tags/update-tag-value.js";

export const tags = {
  createTagKey,
  deleteTagKey,
  readTagKey,
  readTagKeys,
  updateTagKey,
  createTagValue,
  deleteTagValue,
  readTagValue,
  readTagValues,
  updateTagValue,
};

import { createTransfer } from "./modules/transfers/create-transfer.js";
import { deleteTransfer } from "./modules/transfers/delete-transfer.js";
import { readTransfer } from "./modules/transfers/read-transfer.js";
import { readTransfers } from "./modules/transfers/read-transfers.js";
import { updateTransfer } from "./modules/transfers/update-transfer.js";

export const transfers = {
  createTransfer,
  deleteTransfer,
  readTransfer,
  readTransfers,
  updateTransfer,
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
