UPDATE
  TAG_KEY
SET
  ${ sets:raw }
WHERE
  TAG_KEY_ID = ${ tagKeyID }
  AND USER_ID = ${ userID }
RETURNING
  *
