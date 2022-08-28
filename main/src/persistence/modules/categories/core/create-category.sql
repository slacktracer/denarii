INSERT INTO
  PUBLIC.CATEGORY (CATEGORY_ID, CREATED_AT, GROUP_ID, NAME, USER_ID)
VALUES
  (
    GEN_RANDOM_UUID (),
    ${ createdAt },
    ${ groupID },
    ${ name },
    ${ userID }
  )
RETURNING
  CATEGORY_ID,
  GROUP_ID,
  NAME,
  USER_ID
