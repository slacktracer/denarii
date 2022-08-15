INSERT INTO
  TRANSFER (
    AMOUNT,
    AT,
    FROM_ACCOUNT_ID,
    TO_ACCOUNT_ID,
    TRANSFER_ID,
    USER_ID
  )
VALUES
  (
    ${ amount },
    ${ at },
    ${ fromAccountID },
    ${ toAccountID },
    GEN_RANDOM_UUID (),
    ${ userID }
  )
RETURNING
  AMOUNT,
  AT,
  FROM_ACCOUNT_ID,
  TO_ACCOUNT_ID,
  TRANSFER_ID,
  USER_ID;
