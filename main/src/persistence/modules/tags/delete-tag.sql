DELETE FROM
  PUBLIC.TAG
WHERE
  TAG_ID = ${ tagID }
  AND USER_ID = ${ userID }
