import { getFixedUUID } from "./get-fixed-uuid.js";
import { makeEnhancedArray } from "./make-enhanced-array.js";

export const makeOperationData = ({
  accountID01,
  accountID05,
  accountID06,
  categoryID01,
  categoryID02,
  categoryID03,
  categoryID04,
  categoryID05,
  categoryID06,
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
    amount: 100_000_00,
    amountPerUnit: 100_000_00,
    at: new Date().toISOString(),
    categoryID: categoryID01,
    comments: "This is operation 1.",
    createdAt: new Date().toISOString(),
    deleted: false,
    operationID: getFixedUUID(),
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
    amount: -15_000_00,
    amountPerUnit: -15_000_00,
    at: new Date().toISOString(),
    categoryID: categoryID02,
    comments: "This is operation 2.",
    createdAt: new Date().toISOString(),
    deleted: false,
    operationID: getFixedUUID(),
    tags: {
      [tagKeyID01]: tagValueID01,
      [tagKeyID02]: tagValueID02,
    },
    type: "Expense",
    unitCount: 1,
    updatedAt: null,
    userID: userID01,
  };

  const operation03 = {
    accountID: accountID01,
    amount: 1_000_00,
    amountPerUnit: 1_000_00,
    at: new Date().toISOString(),
    categoryID: categoryID03,
    comments: "This is operation 3.",
    createdAt: new Date().toISOString(),
    deleted: false,
    operationID: getFixedUUID(),
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
    amount: -3_400_00,
    amountPerUnit: -3_400_00,
    at: new Date().toISOString(),
    categoryID: categoryID04,
    comments: "This is operation 4.",
    createdAt: new Date().toISOString(),
    deleted: false,
    operationID: getFixedUUID(),
    tags: {
      [tagKeyID03]: tagValueID03,
      [tagKeyID04]: tagValueID04,
    },
    type: "Expense",
    unitCount: 1,
    updatedAt: null,
    userID: userID01,
  };

  const operation05 = {
    accountID: accountID05,
    amount: 10_000_00,
    amountPerUnit: 10_000_00,
    at: new Date().toISOString(),
    categoryID: categoryID05,
    comments: "This is operation 5.",
    createdAt: new Date().toISOString(),
    deleted: false,
    operationID: getFixedUUID(),
    tags: {
      [tagKeyID01]: tagValueID01,
      [tagKeyID02]: tagValueID02,
    },
    type: "Income",
    unitCount: 1,
    updatedAt: null,
    userID: userID02,
  };

  const operation06 = {
    accountID: accountID01,
    amount: 100_00,
    amountPerUnit: 100_00,
    at: new Date().toISOString(),
    categoryID: categoryID01,
    comments: "This is operation 6.",
    createdAt: new Date().toISOString(),
    deleted: false,
    operationID: getFixedUUID(),
    tags: {
      [tagKeyID01]: tagValueID01,
      [tagKeyID02]: tagValueID02,
    },
    type: "Income",
    unitCount: 1,
    updatedAt: null,
    userID: userID01,
  };

  const operation07 = {
    accountID: accountID01,
    amount: 100_00,
    amountPerUnit: 100_00,
    at: new Date().toISOString(),
    categoryID: categoryID02,
    comments: "This is operation 7.",
    createdAt: new Date().toISOString(),
    deleted: false,
    operationID: getFixedUUID(),
    tags: {
      [tagKeyID01]: tagValueID01,
      [tagKeyID02]: tagValueID02,
    },
    type: "Income",
    unitCount: 1,
    updatedAt: null,
    userID: userID01,
  };

  const operation08 = {
    accountID: accountID01,
    amount: 100_00,
    amountPerUnit: 100_00,
    at: new Date().toISOString(),
    categoryID: categoryID03,
    comments: "This is operation 8.",
    createdAt: new Date().toISOString(),
    deleted: false,
    operationID: getFixedUUID(),
    tags: {
      [tagKeyID03]: tagValueID03,
      [tagKeyID04]: tagValueID04,
    },
    type: "Income",
    unitCount: 1,
    updatedAt: null,
    userID: userID01,
  };

  const operation09 = {
    accountID: accountID01,
    amount: 100_00,
    amountPerUnit: 100_00,
    at: new Date().toISOString(),
    categoryID: categoryID04,
    comments: "This is operation 9.",
    createdAt: new Date().toISOString(),
    deleted: false,
    operationID: getFixedUUID(),
    tags: {
      [tagKeyID03]: tagValueID03,
      [tagKeyID04]: tagValueID04,
    },
    type: "Income",
    unitCount: 1,
    updatedAt: null,
    userID: userID01,
  };

  const operation10 = {
    accountID: accountID06,
    amount: -650_00,
    amountPerUnit: -650_00,
    at: new Date().toISOString(),
    categoryID: categoryID06,
    comments: "This is operation 10.",
    createdAt: new Date().toISOString(),
    deleted: false,
    operationID: getFixedUUID(),
    tags: {
      [tagKeyID01]: tagValueID01,
      [tagKeyID02]: tagValueID02,
    },
    type: "Expense",
    unitCount: 1,
    updatedAt: null,
    userID: userID02,
  };

  const operation11 = {
    accountID: accountID01,
    amount: -1_000_00,
    amountPerUnit: -1_000_00,
    at: new Date("2023-10-03").toISOString(),
    categoryID: categoryID04,
    comments: "This is operation 11. It is in the past!",
    createdAt: new Date().toISOString(),
    deleted: false,
    operationID: getFixedUUID(),
    tags: {},
    type: "Expense",
    unitCount: 1,
    updatedAt: null,
    userID: userID01,
  };

  const operation12 = {
    accountID: accountID05,
    amount: -1_000_00,
    amountPerUnit: -1_000_00,
    at: "2023-08-07T21:00:00.000Z",
    categoryID: categoryID04,
    comments: "This is operation 12. It is in the past!",
    createdAt: new Date().toISOString(),
    deleted: false,
    operationID: getFixedUUID(),
    tags: {},
    type: "Expense",
    unitCount: 1,
    updatedAt: null,
    userID: userID02,
  };

  const operation13 = {
    accountID: accountID05,
    amount: 1_500_00,
    amountPerUnit: 1_500_00,
    at: "2023-08-07T21:01:00.000Z",
    categoryID: categoryID04,
    comments: "This is operation 13. It is in the past!",
    createdAt: new Date().toISOString(),
    deleted: false,
    operationID: getFixedUUID(),
    tags: {},
    type: "Income",
    unitCount: 1,
    updatedAt: null,
    userID: userID02,
  };

  const operation14 = {
    accountID: accountID06,
    amount: -1_000_00,
    amountPerUnit: -1_000_00,
    at: "2012-11-01T12:00:00.000Z",
    categoryID: categoryID04,
    comments: "This is operation 14. It is in the past!",
    createdAt: new Date().toISOString(),
    deleted: false,
    operationID: getFixedUUID(),
    tags: {},
    type: "Expense",
    unitCount: 1,
    updatedAt: null,
    userID: userID02,
  };

  const operation15 = {
    accountID: accountID06,
    amount: 1_250_00,
    amountPerUnit: 1_250_00,
    at: "2012-11-01T12:01:00.000Z",
    categoryID: categoryID04,
    comments: "This is operation 15. It is in the past!",
    createdAt: new Date().toISOString(),
    deleted: false,
    operationID: getFixedUUID(),
    tags: {},
    type: "Income",
    unitCount: 1,
    updatedAt: null,
    userID: userID02,
  };

  const operations = makeEnhancedArray({
    id: "operationID",
    object: {
      operation01,
      operation02,
      operation03,
      operation04,
      operation05,
      operation06,
      operation07,
      operation08,
      operation09,
      operation10,
      operation11,
      operation12,
      operation13,
      operation14,
      operation15,
    },
  });

  return { operations };
};
