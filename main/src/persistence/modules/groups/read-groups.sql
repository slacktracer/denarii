SELECT
  *
FROM
  PUBLIC.GROUP
WHERE
  USER_ID = ${ userID }
ORDER BY
  NAME