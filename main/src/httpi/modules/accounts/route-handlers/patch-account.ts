import { accounts } from "../../../../domain/domain.js";

const { updateAccount } = accounts;

export const patchAccount = async (request, response) => {
  const { userID } = request.session.user;

  const { accountID } = request.params;

  const { initialAmount, name } = request.body;

  const data = { initialAmount, name };

  const updatedAccount = await updateAccount({ accountID, data, userID });

  response.json(updatedAccount);
};
