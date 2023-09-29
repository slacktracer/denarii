import {
  CustomError,
  NO_SUCH_ACCOUNT,
  NO_SUCH_CATEGORY,
  operations,
  tryCatch,
  UNKNOWN_ERROR,
} from "../../../../domain/domain.js";
import { filterOutUndefinedEntries } from "../../../functions/filter-out-undefined-entries.js";
import { print } from "../../../objects/print.js";

const { updateOperation } = operations;

export const patchOperation = async (request, response) => {
  const { userID } = request.session.user;

  const { operationID } = request.params;

  const {
    accountID,
    amount,
    amountPerUnit,
    categoryID,
    comments,
    type,
    unitCount,
  } = request.body;

  const data = {
    accountID,
    amount,
    amountPerUnit,
    categoryID,
    comments,
    type,
    unitCount,
  };

  const result = await tryCatch(updateOperation, {
    operationID,
    data: filterOutUndefinedEntries({ object: data }),
    userID,
  });

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
