import type { createAccountParameter } from "../../../../types.js";

import { db, loadQuery } from "../../../../persistence/persistence.js";

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
    initialAmount,
    name,
    userID,
  });

  return createdAccount;
};
