UPDATE
  PUBLIC.CATEGORY
SET
  ${ sets:raw }
WHERE
  CATEGORY_ID = ${ categoryID }
  AND USER_ID = ${ userID }
RETURNING
  *
