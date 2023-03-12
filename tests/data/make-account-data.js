import { v4 as uuid } from "uuid";

import { makeEnhancedArray } from "./make-enhanced-array.js";

export const makeAccountData = ({ userID01, userID02 }) => {
  const account01 = {
    accountID: uuid(),
    createdAt: new Date().toISOString(),
    deleted: false,
    initialAmount: 0,
    name: "Account 1!",
    userID: userID01,
  };

  const account02 = {
    accountID: uuid(),
    createdAt: new Date().toISOString(),
    deleted: false,
    initialAmount: 0,
    name: "Account 2!",
    userID: userID01,
  };

  const account03 = {
    accountID: uuid(),
    createdAt: new Date().toISOString(),
    deleted: false,
    initialAmount: 0,
    name: "Account 3!",
    userID: userID01,
  };

  const account04 = {
    accountID: uuid(),
    createdAt: new Date().toISOString(),
    deleted: false,
    initialAmount: 0,
    name: "Account 4!",
    userID: userID01,
  };

  const account05 = {
    accountID: uuid(),
    createdAt: new Date().toISOString(),
    deleted: false,
    initialAmount: 0,
    name: "Account 5!",
    userID: userID01,
  };

  const account06 = {
    accountID: uuid(),
    createdAt: new Date().toISOString(),
    deleted: false,
    initialAmount: 0,
    name: "Account 6!",
    userID: userID02,
  };

  const accounts = makeEnhancedArray({
    account01,
    account02,
    account03,
    account04,
    account05,
    account06,
  });

  return { accounts };
};
