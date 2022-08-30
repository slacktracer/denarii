import { CustomError } from "../../../../domain/custom-error.js";
import { NO_SUCH_ACCOUNT } from "../../../../domain/data/errors.js";
import { deleteAccount } from "../../../../domain/modules/accounts/delete-account.js";
import { tryCatch } from "../../../../domain/functions/try-catch.js";

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

  console.error(result);

  response.status(500).end();
};
