UPDATE
  TAG_VALUE
SET
  ${ sets:raw }
WHERE
  TAG_VALUE_ID = ${ tagValueID }
  AND USER_ID = ${ userID }
RETURNING
  *
