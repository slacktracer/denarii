import { randomUUID } from "crypto";

import type { createAccountParameter } from "../../../types.js";
import { db } from "../../connect.js";

export const createAccount = async ({
  data,
  userID,
}: createAccountParameter) => {
  const { initialAmount, name } = data;

  const createdAccount = db.account.create({
    data: {
      accountID: randomUUID(),
      createdAt: new Date(),
      initialAmount,
      name,
      userID,
    },
  });

  return createdAccount;
};
