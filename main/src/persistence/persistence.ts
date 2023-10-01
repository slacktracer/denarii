export { redisClient } from "./connect.js";

import { accountHasOperation } from "./modules/accounts/account-has-operation.js";
import { accountHasTransfer } from "./modules/accounts/account-has-transfer.js";
import { createAccount } from "./modules/accounts/create-account.js";
import { deleteAccount } from "./modules/accounts/delete-account.js";
import { doesAccountExists } from "./modules/accounts/does-account-exists.js";
import { readAccount } from "./modules/accounts/read-account.js";
import { readAccounts } from "./modules/accounts/read-accounts.js";
import { updateAccount } from "./modules/accounts/update-account.js";

export const accounts = {
  accountHasOperation,
  accountHasTransfer,
  createAccount,
  deleteAccount,
  doesAccountExists,
  readAccount,
  readAccounts,
  updateAccount,
};

import { calculateBalances } from "./modules/balances/calculate-balances.js";

export const balances = { calculateBalances };

import { createCategory } from "./modules/categories/create-category.js";
import { deleteCategory } from "./modules/categories/delete-category.js";
import { doesCategoryExists } from "./modules/categories/does-category-exists.js";
import { readCategories } from "./modules/categories/read-categories.js";
import { readCategory } from "./modules/categories/read-category.js";
import { updateCategory } from "./modules/categories/update-category.js";

export const categories = {
  createCategory,
  deleteCategory,
  doesCategoryExists,
  readCategory,
  readCategories,
  updateCategory,
};

import { createGroup } from "./modules/groups/create-group.js";
import { deleteGroup } from "./modules/groups/delete-group.js";
import { doesGroupExists } from "./modules/groups/does-group-exists.js";
import { readGroup } from "./modules/groups/read-group.js";
import { readGroups } from "./modules/groups/read-groups.js";
import { updateGroup } from "./modules/groups/update-group.js";

export const groups = {
  createGroup,
  deleteGroup,
  doesGroupExists,
  readGroup,
  readGroups,
  updateGroup,
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
  createTagValue,
  deleteTagKey,
  deleteTagValue,
  readTagKey,
  readTagValue,
  readTagKeys,
  readTagValues,
  updateTagKey,
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
