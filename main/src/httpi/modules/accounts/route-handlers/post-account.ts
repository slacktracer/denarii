import { accounts } from "../../../../persistence/persistence.js";

const { createAccount } = accounts;

export const postAccount = async (request, response) => {
  const { userID } = request.session.user;

  const { initialAmount, name } = request.body;

  const data = { initialAmount, name };

  const createdAccount = await createAccount({ data, userID });

  response.json(createdAccount);
};
