import { v4 as uuid } from "uuid";

import { makeEnhancedArray } from "./make-enhanced-array.js";

export const makeOperationData = ({ accountID01, userID01, userID02 }) => {
  const operation01 = {
    accountID: accountID01,
    amount: 100_00,
    amountPerUnit: 100_00,
    at: new Date().toISOString(),
    comments: "This is operation 1.",
    createdAt: new Date().toISOString(),
    operationID: uuid(),
    type: "Income",
    unitCount: 1,
    userID: userID01,
  };

  const operation02 = {
    accountID: accountID01,
    amount: 100_00,
    amountPerUnit: 100_00,
    at: new Date().toISOString(),
    comments: "This is operation 2.",
    createdAt: new Date().toISOString(),
    operationID: uuid(),
    type: "Income",
    unitCount: 1,
    userID: userID01,
  };

  const operation03 = {
    accountID: accountID01,
    amount: 100_00,
    amountPerUnit: 100_00,
    at: new Date().toISOString(),
    comments: "This is operation 3.",
    createdAt: new Date().toISOString(),
    operationID: uuid(),
    type: "Income",
    unitCount: 1,
    userID: userID01,
  };

  const operation04 = {
    accountID: accountID01,
    amount: 100_00,
    amountPerUnit: 100_00,
    at: new Date().toISOString(),
    comments: "This is operation 4.",
    createdAt: new Date().toISOString(),
    operationID: uuid(),
    type: "Income",
    unitCount: 1,
    userID: userID01,
  };

  const operation05 = {
    accountID: accountID01,
    amount: 100_00,
    amountPerUnit: 100_00,
    at: new Date().toISOString(),
    comments: "This is operation 5.",
    createdAt: new Date().toISOString(),
    operationID: uuid(),
    type: "Income",
    unitCount: 1,
    userID: userID02,
  };

  const operations = makeEnhancedArray({
    operation01,
    operation02,
    operation03,
    operation04,
    operation05,
  });

  return { operations };
};
