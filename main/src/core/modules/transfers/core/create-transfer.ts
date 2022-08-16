import { db, loadQuery } from "../../../../persistence/persistence.js";

const createTransferQuery = loadQuery({
  base: import.meta.url,
  url: "./create-transfer.sql",
});

export const createTransfer = async ({ data, userID }) => {
  const { amount, at, fromAccountID, toAccountID } = data;

  const createdTransfer = db.one(createTransferQuery, {
    amount,
    at,
    fromAccountID,
    toAccountID,
    userID,
  });

  return createdTransfer;
};
