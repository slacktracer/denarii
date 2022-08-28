UPDATE
  ACCOUNT
SET
  ${ sets:raw }
WHERE
  ACCOUNT_ID = ${ accountID }
  AND USER_ID = ${ userID }
RETURNING
  *
