INSERT INTO
  PUBLIC.GROUP (CREATED_AT, GROUP_ID, NAME, USER_ID)
VALUES
  (
    ${ createdAt },
    GEN_RANDOM_UUID (),
    ${ name },
    ${ userID }
  )
RETURNING
  GROUP_ID,
  NAME,
  USER_ID
