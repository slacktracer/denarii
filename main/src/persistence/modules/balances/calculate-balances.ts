import { db } from "../../connect.js";
import { itemsSumBySomeProperty } from "./items-sum-by-some-property.js";

export const calculateBalances = async ({ userID }) => {
  const accounts = await db.account.findMany({
    select: { accountID: true, initialAmount: true, name: true },
    where: { userID },
  });

  const operations = await db.operation.findMany({
    select: { accountID: true, amount: true },
    where: { userID },
  });

  const operationsSumByAccountID = itemsSumBySomeProperty({
    list: operations,
    property: "accountID",
  });

  const transfers = await db.transfer.findMany({
    select: { amount: true, fromAccountID: true, toAccountID: true },
    where: { userID },
  });

  const transfersSumByFromAccountID = itemsSumBySomeProperty({
    list: transfers,
    property: "fromAccountID",
  });

  const transfersSumByToAccountID = itemsSumBySomeProperty({
    list: transfers,
    property: "toAccountID",
  });

  const balances = accounts.map((account) => {
    return {
      accountID: account.accountID,
      name: account.name,
      total: account.initialAmount,
    };
  });

  balances.forEach((balance) => {
    balance.total =
      balance.total +
      (operationsSumByAccountID[balance.accountID] || 0) -
      (transfersSumByFromAccountID[balance.accountID] || 0) +
      (transfersSumByToAccountID[balance.accountID] || 0);
  });

  return balances;
};
