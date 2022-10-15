INSERT INTO
  OPERATION (
    ACCOUNT_ID,
    AMOUNT,
    AMOUNT_PER_UNIT,
    AT,
    COMMENTS,
    CREATED_AT,
    OPERATION_ID,
    TYPE
,
      UNIT_COUNT,
      USER_ID
  )
VALUES
  (
    ${ accountID },
    ${ amount },
    ${ amountPerUnit },
    NOW(),
    ${ comments },
    ${ createdAt },
    GEN_RANDOM_UUID (),
    ${ type },
    ${ unitCount },
    ${ userID }
  )
RETURNING
  ACCOUNT_ID,
  AMOUNT,
  AMOUNT_PER_UNIT,
  AT,
  COMMENTS,
  OPERATION_ID,
TYPE
,
  UNIT_COUNT,
  USER_ID
