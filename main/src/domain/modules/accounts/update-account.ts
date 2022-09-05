import { accounts } from "../../../persistence/persistence.js";

export const updateAccount = ({ accountID, data, userID }) =>
  accounts.updateAccount({
    accountID,
    data,
    userID,
  });
