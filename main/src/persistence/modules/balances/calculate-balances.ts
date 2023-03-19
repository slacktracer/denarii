import { db } from "../../connect.js";
import { convertMultiQueryStringToMultipleQueryStrings } from "./convert-multi-query-string-to-multiple-query-strings.js";

const calculateBalancesQuery = ({ userID }) => `
DROP TABLE IF EXISTS
  BALANCE;

--
SELECT
  ACCOUNT.ACCOUNT_ID,
  ACCOUNT.INITIAL_AMOUNT AS TOTAL INTO BALANCE
FROM
  ACCOUNT
WHERE
  USER_ID = '${userID}'
ORDER BY
  ACCOUNT.NAME;

--
INSERT INTO
  BALANCE
SELECT
  TRANSFER.FROM_ACCOUNT_ID AS ACCOUNT_ID,
  SUM(AMOUNT) * -1 AS TOTAL
FROM
  TRANSFER
WHERE
  USER_ID = '${userID}'
GROUP BY
  TRANSFER.FROM_ACCOUNT_ID;

--
INSERT INTO
  BALANCE
SELECT
  TRANSFER.TO_ACCOUNT_ID AS ACCOUNT_ID,
  SUM(AMOUNT) AS TOTAL
FROM
  TRANSFER
WHERE
  USER_ID = '${userID}'
GROUP BY
  TRANSFER.TO_ACCOUNT_ID;

--
INSERT INTO
  BALANCE
SELECT
  OPERATION.ACCOUNT_ID,
  SUM(AMOUNT) AS TOTAL
FROM
  OPERATION
WHERE
  USER_ID = '${userID}'
GROUP BY
  OPERATION.ACCOUNT_ID;

--
SELECT
  BALANCE.ACCOUNT_ID,
  (
    SELECT
      NAME
    FROM
      ACCOUNT
    WHERE
      ACCOUNT.ACCOUNT_ID = BALANCE.ACCOUNT_ID
  ) AS NAME,
  CAST(SUM(BALANCE.TOTAL) AS INTEGER) AS TOTAL
FROM
  BALANCE
GROUP BY
  BALANCE.ACCOUNT_ID
ORDER BY
  NAME;
`;

export const calculateBalances = async ({ userID }) => {
  const queries = convertMultiQueryStringToMultipleQueryStrings(
    calculateBalancesQuery({ userID }),
  );

  let result;

  for (const query of queries) {
    result = await db.$queryRawUnsafe(query);
  }

  const balances = result;

  return balances;
};
