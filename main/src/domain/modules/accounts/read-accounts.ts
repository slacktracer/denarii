import { accounts } from "../../../persistence/persistence.js";

export const readAccounts = ({ userID }) => accounts.readAccounts({ userID });
