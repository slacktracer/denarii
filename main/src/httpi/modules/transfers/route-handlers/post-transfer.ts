import { transfers } from "../../../../domain/domain.js";

const { createTransfer } = transfers;

export const postTransfer = async (request, response) => {
  const { userID } = request.session.user;

  const { amount, at, fromAccountID, toAccountID } = request.body;

  const data = { amount, at, fromAccountID, toAccountID };

  const createdTransfer = await createTransfer({ data, userID });

  response.json(createdTransfer);
};
