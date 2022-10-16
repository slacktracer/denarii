INSERT INTO
  TAG_KEY (CREATED_AT, NAME, TAG_KEY_ID, USER_ID)
VALUES
  (
    ${ createdAt },
    ${ name },
    GEN_RANDOM_UUID (),
    ${ userID }
  )
RETURNING
  NAME,
  TAG_KEY_ID,
  USER_ID
