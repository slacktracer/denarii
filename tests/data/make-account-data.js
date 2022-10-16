import { v4 as uuid } from "uuid";

export const makeAccountData = ({ userID01, userID02 }) => {
  const accountID01 = uuid();
  const accountID02 = uuid();
  const accountID03 = uuid();
  const accountID04 = uuid();
  const accountID05 = uuid();
  const accountID06 = uuid();

  const account01 = {
    accountID: accountID01,
    createdAt: new Date().toISOString(),
    initialAmount: 0,
    name: "Account 1!",
    userID: userID01,
  };

  const account02 = {
    accountID: accountID02,
    createdAt: new Date().toISOString(),
    initialAmount: 0,
    name: "Account 2!",
    userID: userID01,
  };

  const account03 = {
    accountID: accountID03,
    createdAt: new Date().toISOString(),
    initialAmount: 0,
    name: "Account 3!",
    userID: userID01,
  };

  const account04 = {
    accountID: accountID04,
    createdAt: new Date().toISOString(),
    initialAmount: 0,
    name: "Account 4!",
    userID: userID01,
  };

  const account05 = {
    accountID: accountID05,
    createdAt: new Date().toISOString(),
    initialAmount: 0,
    name: "Account 5!",
    userID: userID01,
  };

  const account06 = {
    accountID: accountID06,
    createdAt: new Date().toISOString(),
    initialAmount: 0,
    name: "Account 6!",
    userID: userID02,
  };

  return {
    account01,
    accountID01,
    account02,
    accountID02,
    account03,
    accountID03,
    account04,
    accountID04,
    account05,
    accountID05,
    account06,
    accountID06,
  };
};
