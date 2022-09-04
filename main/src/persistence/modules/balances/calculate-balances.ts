import { db } from "../../connect.js";
import { loadQuery } from "../../functions/load-query.js";

const calculateBalancesQuery = loadQuery({
  base: import.meta.url,
  url: "./calculate-balances-pg-mem-compat.sql",
});

export const calculateBalances = async ({ userID }) => {
  const balances = await db.manyOrNone(calculateBalancesQuery, { userID });

  return balances;
};
