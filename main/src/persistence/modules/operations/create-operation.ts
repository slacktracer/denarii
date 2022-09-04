import { db } from "../../connect.js";
import { loadQuery } from "../../functions/load-query.js";

const createOperationQuery = loadQuery({
  base: import.meta.url,
  url: "./create-operation.sql",
});

export const createOperation = async ({ data, userID }) => {
  const {
    accountID,
    amount,
    amountPerUnit,
    categoryID,
    comments,
    groupID,
    type,
    unitCount,
  } = data;

  const createdOperation = db.one(createOperationQuery, {
    accountID,
    amount,
    amountPerUnit,
    categoryID,
    comments,
    createdAt: new Date(),
    groupID,
    type,
    unitCount,
    userID,
  });

  return createdOperation;
};
