import {
  accounts,
  CustomError,
  NO_SUCH_ACCOUNT,
  tryCatch,
  UNKNOWN_ERROR,
} from "../../../../domain/domain.js";
import { print } from "../../../objects/print.js";

const { deleteAccount } = accounts;

export const deleteAccountByID = async (request, response) => {
  const { userID } = request.session.user;

  const { accountID } = request.params;

  const result = await tryCatch(deleteAccount, {
    accountID,
    userID,
  });

  if (result instanceof Error === false) {
    response.json(result);

    return;
  }

  if (result instanceof CustomError) {
    if (result.data.id === NO_SUCH_ACCOUNT) {
      response.status(404).end();

      return;
    }
  }

  print.warn(UNKNOWN_ERROR);
  print.error(result);

  response.status(500).end();
};
