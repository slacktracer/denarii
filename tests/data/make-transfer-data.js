import { v4 as uuid } from "uuid";

import { makeEnhancedArray } from "./make-enhanced-array.js";

export const makeTransferData = ({ accountID01, accountID02, userID01 }) => {
  const transfer01 = {
    amount: 10_000_00,
    at: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    fromAccountID: accountID01,
    toAccountID: accountID02,
    transferID: uuid(),
    userID: userID01,
  };

  const transfer02 = {
    amount: 10_000_00,
    at: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    fromAccountID: accountID01,
    toAccountID: accountID02,
    transferID: uuid(),
    userID: userID01,
  };

  const transfer03 = {
    amount: 10_000_00,
    at: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    fromAccountID: accountID01,
    toAccountID: accountID02,
    transferID: uuid(),
    userID: userID01,
  };

  const transfer04 = {
    amount: 10_000_00,
    at: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    fromAccountID: accountID01,
    toAccountID: accountID02,
    transferID: uuid(),
    userID: userID01,
  };

  const transfers = makeEnhancedArray({
    transfer01,
    transfer02,
    transfer03,
    transfer04,
  });

  return { transfers };
};
