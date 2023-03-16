import { operations } from "../../../../domain/domain.js";

const { createOperation } = operations;

export const postOperation = async (request, response) => {
  const { userID } = request.session.user;

  const { accountID, amount, amountPerUnit, at, comments, type, unitCount } =
    request.body;

  const data = {
    accountID,
    amount,
    amountPerUnit,
    at,
    comments,
    type,
    unitCount,
  };

  const createdOperation = await createOperation({ data, userID });

  response.json(createdOperation);
};
