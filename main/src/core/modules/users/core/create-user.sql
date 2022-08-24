INSERT INTO
  PUBLIC.USER (CREATED_AT, EMAIL, USER_ID, USERNAME, PASSWORD)
VALUES
  (
    ${ createdAt },
    ${ email },
    GEN_RANDOM_UUID (),
    ${ username },
    ${ password }
  )
RETURNING
  EMAIL,
  USER_ID,
  USERNAME;
