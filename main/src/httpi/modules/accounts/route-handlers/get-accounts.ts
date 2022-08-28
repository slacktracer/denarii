import { readAccounts } from "../../../../persistence/modules/accounts/read-accounts.js";

export const getAccounts = async (request, response) => {
  const { userID } = request.session.user;

  const accounts = await readAccounts({ userID });

  response.json(accounts);
};
