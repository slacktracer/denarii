import { transfers } from "../../../../domain/domain.js";

const { readTransfers } = transfers;

export const getTransfers = async (request, response) => {
  const { from, to } = request.query;

  const { userID } = request.session.user;

  const transfers = await readTransfers({ from, to, userID });

  response.json(transfers);
};
