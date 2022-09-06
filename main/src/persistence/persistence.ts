import "./setup.js";

export { legacyRedisClient } from "./connect.js";

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

import { calculateBalances } from "./modules/balances/calculate-balances.js";

export const balances = { calculateBalances };

import { createCategory } from "./modules/categories/create-category.js";
import { deleteCategory } from "./modules/categories/delete-category.js";
import { readCategories } from "./modules/categories/read-categories.js";
import { readCategory } from "./modules/categories/read-category.js";
import { updateCategory } from "./modules/categories/update-category.js";

export const categories = {
  createCategory,
  deleteCategory,
  readCategory,
  readCategories,
  updateCategory,
};

import { createGroup } from "./modules/groups/create-group.js";
import { deleteGroup } from "./modules/groups/delete-group.js";
import { readGroup } from "./modules/groups/read-group.js";
import { readGroups } from "./modules/groups/read-groups.js";
import { updateGroup } from "./modules/groups/update-group.js";
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

export const groups = {
  createGroup,
  deleteGroup,
  readGroup,
  readGroups,
  updateGroup,
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
