import express from "express";

import {
  createAccount,
  deleteAccount,
  readAccount,
  readAccounts,
  updateAccount,
} from "../../../core/modules/accounts/accounts.js";

export const createRouter = () => {
  const accountsRouter = express.Router();

  accountsRouter.delete("/:accountID", async (request, response) => {
    const { userID } = request.session.user;

    const { accountID } = request.params;

    try {
      const result = await deleteAccount({ accountID, userID });

      console.log(result);

      response.json(result);
    } catch (error) {
      console.log(error);
      response.status(500).end();
    }
  });

  accountsRouter.get("/", async (request, response) => {
    const { userID } = request.session.user;

    const accounts = await readAccounts({ userID });

    response.json(accounts);
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

  accountsRouter.patch("/:accountID", async (request, response) => {
    const { userID } = request.session.user;

    const { accountID } = request.params;

    const { initialAmount, name } = request.body;

    const data = { initialAmount, name };

    const updatedAccount = await updateAccount({ accountID, data, userID });

    response.json(updatedAccount);
  });

  return accountsRouter;
};
