import { balances } from "../../../../domain/domain.js";

const { calculateBalances } = balances;

export const getBalances = async (request, response) => {
  const { userID } = request.session.user;

  const balances = await calculateBalances({ userID });

  response.json(balances);
};
