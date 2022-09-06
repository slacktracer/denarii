import type { createAccountParameter } from "../../../types.js";
import { db } from "../../connect.js";
import { loadQuery } from "../../functions/load-query.js";

const createAccountQuery = loadQuery({
  base: import.meta.url,
  url: "./create-account.sql",
});

export const createAccount = async ({
  data,
  userID,
}: createAccountParameter) => {
  const { initialAmount, name } = data;

  const createdAccount = db.one(createAccountQuery, {
    createdAt: new Date(),
    initialAmount,
    name,
    userID,
  });

  return createdAccount;
};
