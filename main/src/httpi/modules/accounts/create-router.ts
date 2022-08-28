import express from "express";

import {
  createAccount,
  readAccount,
  readAccounts,
  updateAccount,
} from "../../../core/modules/accounts/accounts.js";
import { deleteAccount } from "../../../domain/modules/accounts/delete-account.js";
import { CustomError } from "../../../domain/custom-error.js";
import { NO_SUCH_ACCOUNT } from "../../../domain/errors.js";
import { tryCatch } from "../../../domain/try-catch.js";

export const createRouter = () => {
  const accountsRouter = express.Router();

  accountsRouter.delete("/:accountID", async (request, response) => {
    const { userID } = request.session.user;

    const noUserID = userID ?? true;

    if (noUserID === true) {
      response.status(401).end();
    }

    const { accountID } = request.params;

    const [result, error] = await tryCatch(deleteAccount, {
      accountID,
      userID,
    });

    if (result) {
      response.json(result);
    }

    if (error !== null) {
      if (error instanceof CustomError) {
        if (error.data.id === NO_SUCH_ACCOUNT) {
          response.status(400).end();

          return;
        }
      }

      console.error(error);

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
