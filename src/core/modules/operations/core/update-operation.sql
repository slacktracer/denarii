UPDATE
  OPERATION
SET
  ${ sets:raw }
WHERE
  OPERATION_ID = ${ operationID }
  AND USER_ID = ${ userID }
RETURNING
  *
