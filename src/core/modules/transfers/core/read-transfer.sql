SELECT
  *
FROM
  TRANSFER
WHERE
  TRANSFER_ID = ${ transferID }
  AND USER_ID = ${ userID }
