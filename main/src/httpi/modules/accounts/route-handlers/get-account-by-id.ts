import { accounts } from "../../../../persistence/persistence.js";

const { readAccount } = accounts;

export const getAccountByID = async (request, response) => {
  const { userID } = request.session.user;

  const { accountID } = request.params;

  const account = await readAccount({ accountID, userID });

  response.json(account);
};
