UPDATE
  PUBLIC.GROUP
SET
  ${ sets:raw }
WHERE
  GROUP_ID = ${ groupID }
  AND USER_ID = ${ userID }
RETURNING
  *
