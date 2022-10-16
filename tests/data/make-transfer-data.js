import { v4 as uuid } from "uuid";

export const makeTransferData = ({ accountID01, accountID02, userID01 }) => {
  const transferID01 = uuid();
  const transferID02 = uuid();
  const transferID03 = uuid();
  const transferID04 = uuid();

  const transfer01 = {
    amount: 10_000_00,
    at: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    fromAccountID: accountID01,
    toAccountID: accountID02,
    transferID: transferID01,
    userID: userID01,
  };

  const transfer02 = {
    amount: 10_000_00,
    at: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    fromAccountID: accountID01,
    toAccountID: accountID02,
    transferID: transferID02,
    userID: userID01,
  };

  const transfer03 = {
    amount: 10_000_00,
    at: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    fromAccountID: accountID01,
    toAccountID: accountID02,
    transferID: transferID03,
    userID: userID01,
  };

  const transfer04 = {
    amount: 10_000_00,
    at: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    fromAccountID: accountID01,
    toAccountID: accountID02,
    transferID: transferID04,
    userID: userID01,
  };

  return {
    transfer01,
    transfer02,
    transfer03,
    transfer04,
    transferID01,
    transferID02,
    transferID03,
    transferID04,
  };
};
