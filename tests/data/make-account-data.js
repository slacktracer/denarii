import { getFixedUUID } from "./get-fixed-uuid.js";
import { makeEnhancedArray } from "./make-enhanced-array.js";

export const makeAccountData = ({ userID01, userID02 }) => {
  const account01 = {
    accountID: getFixedUUID(),
    createdAt: new Date().toISOString(),
    createdAtTimezone: "America/Belem",
    deleted: false,
    initialAmount: 0,
    name: "Account 1!",
    updatedAt: null,
    updatedAtTimezone: "UTC",
    userID: userID01,
  };

  const account02 = {
    accountID: getFixedUUID(),
    createdAt: new Date().toISOString(),
    createdAtTimezone: "America/Belem",
    deleted: false,
    initialAmount: 0,
    name: "Account 2!",
    updatedAt: null,
    updatedAtTimezone: "UTC",
    userID: userID01,
  };

  const account03 = {
    accountID: getFixedUUID(),
    createdAt: new Date().toISOString(),
    createdAtTimezone: "America/Belem",
    deleted: false,
    initialAmount: 0,
    name: "Account 3!",
    updatedAt: null,
    updatedAtTimezone: "UTC",
    userID: userID01,
  };

  const account04 = {
    accountID: getFixedUUID(),
    createdAt: new Date().toISOString(),
    createdAtTimezone: "America/Belem",
    deleted: false,
    initialAmount: 0,
    name: "Account 4!",
    updatedAt: null,
    updatedAtTimezone: "UTC",
    userID: userID01,
  };

  const account05 = {
    accountID: getFixedUUID(),
    createdAt: new Date().toISOString(),
    createdAtTimezone: "America/Belem",
    deleted: false,
    initialAmount: 0,
    name: "Account 5!",
    updatedAt: null,
    updatedAtTimezone: "UTC",
    userID: userID02,
  };

  const account06 = {
    accountID: getFixedUUID(),
    createdAt: new Date().toISOString(),
    createdAtTimezone: "America/Belem",
    deleted: false,
    initialAmount: 0,
    name: "Account 6!",
    updatedAt: null,
    updatedAtTimezone: "UTC",
    userID: userID02,
  };

  const accounts = makeEnhancedArray({
    id: "accountID",
    object: {
      account01,
      account02,
      account03,
      account04,
      account05,
      account06,
    },
  });

  return { accounts };
};
