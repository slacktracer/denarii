import express from "express";

import {
  createAccount,
  readAccount,
  readAccounts,
  updateAccount,
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

  accountsRouter.post("/", async (request, response) => {
    const { userID } = request.session.user;

    const { initialAmount, name } = request.body;

    const data = { initialAmount, name };

    const createdAccount = await createAccount({ data, userID });

    response.json(createdAccount);
  });

  accountsRouter.post("/:accountID", async (request, response) => {
    const { userID } = request.session.user;

    const { accountID } = request.params;

    const { initialAmount, name } = request.body;

    const data = { initialAmount, name };

    const updatedAccount = await updateAccount({ accountID, data, userID });

    response.json(updatedAccount);
  });

  return accountsRouter;
};
