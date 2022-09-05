import { accounts } from "../../../persistence/persistence.js";

export const readAccount = ({ accountID, userID }) =>
  accounts.readAccount({ accountID, userID });
