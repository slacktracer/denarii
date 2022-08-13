INSERT INTO
  OPERATION (
    ACCOUNT_ID,
    AMOUNT,
    AMOUNT_PER_UNIT,
    AT,
    CATEGORY_ID,
    COMMENTS,
    GROUP_ID,
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
    ${ categoryID },
    ${ comments },
    ${ groupID },
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
  CATEGORY_ID,
  COMMENTS,
  GROUP_ID,
  OPERATION_ID,
TYPE
,
  UNIT_COUNT,
  USER_ID
