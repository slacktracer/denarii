import { getFixedUUID } from "./get-fixed-uuid.js";
import { makeEnhancedArray } from "./make-enhanced-array.js";

export const makeTransferData = ({
  accountID01,
  accountID02,
  accountID05,
  accountID06,
  userID01,
  userID02,
}) => {
  const transfer01 = {
    amount: 10_000_00,
    at: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    deleted: false,
    fromAccountID: accountID01,
    toAccountID: accountID02,
    transferID: getFixedUUID(),
    updatedAt: null,
    userID: userID01,
  };

  const transfer02 = {
    amount: 10_000_00,
    at: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    deleted: false,
    fromAccountID: accountID01,
    toAccountID: accountID02,
    transferID: getFixedUUID(),
    updatedAt: null,
    userID: userID01,
  };

  const transfer03 = {
    amount: 10_000_00,
    at: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    deleted: false,
    fromAccountID: accountID01,
    toAccountID: accountID02,
    transferID: getFixedUUID(),
    updatedAt: null,
    userID: userID01,
  };

  const transfer04 = {
    amount: 10_000_00,
    at: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    deleted: false,
    fromAccountID: accountID01,
    toAccountID: accountID02,
    transferID: getFixedUUID(),
    updatedAt: null,
    userID: userID01,
  };

  const transfer05 = {
    amount: 5_000_00,
    at: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    deleted: false,
    fromAccountID: accountID05,
    toAccountID: accountID06,
    transferID: getFixedUUID(),
    updatedAt: null,
    userID: userID02,
  };

  const transfers = makeEnhancedArray({
    transfer01,
    transfer02,
    transfer03,
    transfer04,
    transfer05,
  });

  return { transfers };
};
