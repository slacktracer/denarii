import express from "express";

import { getBalances } from "./route-handlers/get-balances.js";

export const createRouter = () => {
  const accountsRouter = express.Router();

  accountsRouter.get("/", getBalances);

  return accountsRouter;
};
