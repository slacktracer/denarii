INSERT INTO
  TAG (
    CREATED_AT,
    OPERATION_ID,
    TAG_ID,
    TAG_KEY_ID,
    TAG_VALUE_ID,
    USER_ID
  )
VALUES
  (
    ${ createdAt },
    ${ operationID },
    GEN_RANDOM_UUID (),
    ${ tagKeyID },
    ${ tagValueID },
    ${ userID }
  )
RETURNING
  OPERATION_ID,
  TAG_ID,
  TAG_KEY_ID,
  TAG_VALUE_ID,
  USER_ID
