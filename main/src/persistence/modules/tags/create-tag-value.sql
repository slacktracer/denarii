INSERT INTO
  TAG_VALUE (CREATED_AT, NAME, TAG_VALUE_ID, USER_ID)
VALUES
  (
    ${ createdAt },
    ${ name },
    GEN_RANDOM_UUID (),
    ${ userID }
  )
RETURNING
  TAG_VALUE_ID,
  NAME,
  USER_ID
