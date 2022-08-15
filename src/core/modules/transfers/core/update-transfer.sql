UPDATE
  PUBLIC.TRANSFER
SET
  ${ sets:raw }
WHERE
  TRANSFER_ID = ${ transferID }
  AND USER_ID = ${ userID }
RETURNING
  *
