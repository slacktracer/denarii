import { readAccount } from "../../../../persistence/modules/accounts/read-account.js";

export const getAccountByID = async (request, response) => {
  const { userID } = request.session.user;

  const { accountID } = request.params;

  const account = await readAccount({ accountID, userID });

  response.json(account);
};
