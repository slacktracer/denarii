INSERT INTO
  TRANSFER (
    AMOUNT,
    AT,
    FROM_ACCOUNT_ID,
    TO_ACCOUNT_ID,
    TRANSFER_ID
  )
VALUES
  (
    ${ amount },
    NOW(),
    ${ fromAccountID },
    ${ toAccountID },
    GEN_RANDOM_UUID ()
  )
RETURNING
  AMOUNT,
  AT,
  FROM_ACCOUNT_ID,
  TO_ACCOUNT_ID,
  TRANSFER_ID;
