INSERT INTO
  PUBLIC.USER (EMAIL, USER_ID, USERNAME, PASSWORD)
VALUES
  (
    ${ email },
    GEN_RANDOM_UUID (),
    ${ username },
    ${ password }
  )
RETURNING
  EMAIL,
  USER_ID,
  USERNAME;
