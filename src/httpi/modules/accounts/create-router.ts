import express from "express";

import {
  readAccount,
  readAccounts,
} from "../../../core/modules/accounts/accounts.js";

export const createRouter = () => {
  const accountsRouter = express.Router();

  accountsRouter.get("/", async (request, response) => {
    const { userID } = request.session.user;

    const accountsRouter = await readAccounts({ userID });

    response.json(accountsRouter);
  });

  accountsRouter.get("/:accountID", async (request, response) => {
    const { userID } = request.session.user;

    const { accountID } = request.params;

    const account = await readAccount({ accountID, userID });

    response.json(account);
  });

  return accountsRouter;
};
