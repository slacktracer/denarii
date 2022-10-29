import { transfers } from "../../../../domain/domain.js";

const { readTransfers } = transfers;

export const getTransfers = async (request, response) => {
  const { userID } = request.session.user;

  const transfers = await readTransfers({ userID });

  response.json(transfers);
};
