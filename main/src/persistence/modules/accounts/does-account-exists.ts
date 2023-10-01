import { db } from "../../connect.js";

export const doesAccountExists = ({ accountID, userID }) =>
  db.account.exists({ accountID, userID });
