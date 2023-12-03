import {
  CustomError,
  NO_SUCH_ACCOUNT,
  NO_SUCH_CATEGORY,
  operations,
  tryCatch,
  UNKNOWN_ERROR,
} from "../../../../domain/domain.js";
import { print } from "../../../objects/print.js";

const { createOperation } = operations;

export const postOperation = async (request, response) => {
  const { userID } = request.session.user;

  const {
    accountID,
    amount,
    amountPerUnit,
    at,
    categoryID,
    comments,
    operationID,
    type,
    unitCount,
  } = request.body;

  const data = {
    accountID,
    amount,
    amountPerUnit,
    at,
    categoryID,
    comments,
    operationID,
    type,
    unitCount,
  };

  const result = await tryCatch(createOperation, { data, userID });

  if (result instanceof Error === false) {
    response.json(result);

    return;
  }

  if (result instanceof CustomError) {
    if (result.data.id === NO_SUCH_ACCOUNT) {
      response.status(400).json({ message: NO_SUCH_ACCOUNT.description });

      return;
    }

    if (result.data.id === NO_SUCH_CATEGORY) {
      response.status(400).json({ message: NO_SUCH_CATEGORY.description });

      return;
    }
  }

  print.warn(UNKNOWN_ERROR);
  print.error(result);

  response.status(500).end();
};
