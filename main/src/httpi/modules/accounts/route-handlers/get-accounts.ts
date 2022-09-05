import { accounts } from "../../../../persistence/persistence.js";

const { readAccounts } = accounts;

export const getAccounts = async (request, response) => {
  const { userID } = request.session.user;

  const accounts = await readAccounts({ userID });

  response.json(accounts);
};
