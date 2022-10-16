UPDATE
  TAG
SET
  ${ sets:raw }
WHERE
  TAG_ID = ${ tagID }
  AND USER_ID = ${ userID }
RETURNING
  *
