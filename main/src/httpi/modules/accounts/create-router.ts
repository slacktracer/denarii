import express from "express";

import { deleteAccountByID } from "./route-handlers/delete-account-by-id.js";
import { getAccountByID } from "./route-handlers/get-account-by-id.js";
import { getAccounts } from "./route-handlers/get-accounts.js";
import { patchAccount } from "./route-handlers/patch-account.js";
import { postAccount } from "./route-handlers/post-account.js";

export const createRouter = () => {
  const accountsRouter = express.Router();

  accountsRouter.delete("/:accountID", deleteAccountByID);

  accountsRouter.get("/", getAccounts);

  accountsRouter.get("/:accountID", getAccountByID);

  accountsRouter.post("/", postAccount);

  accountsRouter.patch("/:accountID", patchAccount);

  return accountsRouter;
};
