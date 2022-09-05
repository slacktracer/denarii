import { accounts } from "../../../persistence/persistence.js";

export const createAccount = ({ data, userID }) =>
  accounts.createAccount({
    data,
    userID,
  });
