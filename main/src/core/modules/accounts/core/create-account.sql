INSERT INTO
  ACCOUNT (ACCOUNT_ID, CREATED_AT, INITIAL_AMOUNT, NAME, USER_ID)
VALUES
  (
    GEN_RANDOM_UUID (),
    ${ createdAt },
    ${ initialAmount },
    ${ name },
    ${ userID }
  )
RETURNING
  ACCOUNT_ID,
  INITIAL_AMOUNT,
  NAME,
  USER_ID
