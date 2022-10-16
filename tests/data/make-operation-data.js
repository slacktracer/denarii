import { v4 as uuid } from "uuid";

export const makeOperationData = ({ accountID01, userID01, userID02 }) => {
  const operationID01 = uuid();
  const operationID02 = uuid();
  const operationID03 = uuid();
  const operationID04 = uuid();
  const operationID05 = uuid();

  const operation01 = {
    accountID: accountID01,
    amount: 100_00,
    amountPerUnit: 100_00,
    at: new Date().toISOString(),
    comments: "This is operation 1.",
    createdAt: new Date().toISOString(),
    operationID: operationID01,
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
    operationID: operationID02,
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
    operationID: operationID03,
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
    operationID: operationID04,
    type: "Income",
    unitCount: 1,
    userID: userID01,
  };

  const operation05 = {
    accountID: accountID01,
    amount: 100_00,
    amountPerUnit: 100_00,
    at: new Date().toISOString(),
    comments: "This is operation 4.",
    createdAt: new Date().toISOString(),
    operationID: operationID05,
    type: "Income",
    unitCount: 1,
    userID: userID02,
  };

  return {
    operation01,
    operation02,
    operation03,
    operation04,
    operation05,
    operationID01,
    operationID02,
    operationID03,
    operationID04,
    operationID05,
  };
};
