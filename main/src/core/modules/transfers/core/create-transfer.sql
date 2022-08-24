INSERT INTO
  TRANSFER (
    AMOUNT,
    AT,
    CREATED_AT,
    FROM_ACCOUNT_ID,
    TO_ACCOUNT_ID,
    TRANSFER_ID,
    USER_ID
  )
VALUES
  (
    ${ amount },
    ${ at },
    ${ createdAt },
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
