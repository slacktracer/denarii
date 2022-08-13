INSERT INTO
  PUBLIC.GROUP (GROUP_ID, NAME, USER_ID)
VALUES
  (
    GEN_RANDOM_UUID (),
    ${ name },
    ${ userID }
  )
RETURNING
  GROUP_ID,
  NAME,
  USER_ID
