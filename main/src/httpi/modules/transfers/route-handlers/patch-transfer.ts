import {
  CustomError,
  NO_SUCH_FROM_ACCOUNT,
  NO_SUCH_TO_ACCOUNT,
  transfers,
  tryCatch,
  UNKNOWN_ERROR,
} from "../../../../domain/domain.js";
import { filterOutUndefinedEntries } from "../../../functions/filter-out-undefined-entries.js";
import { print } from "../../../objects/print.js";

const { updateTransfer } = transfers;

export const patchTransfer = async (request, response) => {
  const { userID } = request.session.user;

  const { transferID } = request.params;

  const { amount, at, fromAccountID, toAccountID } = request.body;

  const data = { amount, at, fromAccountID, toAccountID };

  const result = await tryCatch(updateTransfer, {
    transferID,
    data: filterOutUndefinedEntries({ object: data }),
    userID,
  });

  if (result instanceof Error === false) {
    response.json(result);

    return;
  }

  if (result instanceof CustomError) {
    if (result.data.id === NO_SUCH_FROM_ACCOUNT) {
      response.status(400).json({ message: NO_SUCH_FROM_ACCOUNT.description });

      return;
    }

    if (result.data.id === NO_SUCH_TO_ACCOUNT) {
      response.status(400).json({ message: NO_SUCH_TO_ACCOUNT.description });

      return;
    }
  }

  print.warn(UNKNOWN_ERROR);
  print.error(result);

  response.status(500).end();
};
