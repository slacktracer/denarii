import { balances } from "../../../persistence/persistence.js";

export const calculateBalances = ({ userID }) =>
  balances.calculateBalances({ userID });
