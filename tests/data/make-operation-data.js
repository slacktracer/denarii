import { v4 as uuid } from "uuid";

import { makeEnhancedArray } from "./make-enhanced-array.js";

export const makeOperationData = ({
  accountID01,
  tagKeyID01,
  tagKeyID02,
  tagKeyID03,
  tagKeyID04,
  tagValueID01,
  tagValueID02,
  tagValueID03,
  tagValueID04,
  userID01,
  userID02,
}) => {
  const operation01 = {
    accountID: accountID01,
    amount: 100_00,
    amountPerUnit: 100_00,
    at: new Date().toISOString(),
    comments: "This is operation 1.",
    createdAt: new Date().toISOString(),
    deleted: false,
    operationID: uuid(),
    tags: {
      [tagKeyID01]: tagValueID01,
      [tagKeyID02]: tagValueID02,
    },
    type: "Income",
    unitCount: 1,
    updatedAt: null,
    userID: userID01,
  };

  const operation02 = {
    accountID: accountID01,
    amount: 100_00,
    amountPerUnit: 100_00,
    at: new Date().toISOString(),
    comments: "This is operation 2.",
    createdAt: new Date().toISOString(),
    deleted: false,
    operationID: uuid(),
    tags: {
      [tagKeyID01]: tagValueID01,
      [tagKeyID02]: tagValueID02,
    },
    type: "Income",
    unitCount: 1,
    updatedAt: null,
    userID: userID01,
  };

  const operation03 = {
    accountID: accountID01,
    amount: 100_00,
    amountPerUnit: 100_00,
    at: new Date().toISOString(),
    comments: "This is operation 3.",
    createdAt: new Date().toISOString(),
    deleted: false,
    operationID: uuid(),
    tags: {
      [tagKeyID03]: tagValueID03,
      [tagKeyID04]: tagValueID04,
    },
    type: "Income",
    unitCount: 1,
    updatedAt: null,
    userID: userID01,
  };

  const operation04 = {
    accountID: accountID01,
    amount: 100_00,
    amountPerUnit: 100_00,
    at: new Date().toISOString(),
    comments: "This is operation 4.",
    createdAt: new Date().toISOString(),
    deleted: false,
    operationID: uuid(),
    tags: {
      [tagKeyID03]: tagValueID03,
      [tagKeyID04]: tagValueID04,
    },
    type: "Income",
    unitCount: 1,
    updatedAt: null,
    userID: userID01,
  };

  const operation05 = {
    accountID: accountID01,
    amount: 100_00,
    amountPerUnit: 100_00,
    at: new Date().toISOString(),
    comments: "This is operation 5.",
    createdAt: new Date().toISOString(),
    deleted: false,
    operationID: uuid(),
    tags: {
      [tagKeyID01]: tagValueID01,
      [tagKeyID02]: tagValueID02,
    },
    type: "Income",
    unitCount: 1,
    updatedAt: null,
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
