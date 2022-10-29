import { transfers } from "../../../../domain/domain.js";

const { readTransfer } = transfers;

export const getTransferByID = async (request, response) => {
  const { userID } = request.session.user;

  const { transferID } = request.params;

  const transfer = await readTransfer({ transferID, userID });

  response.json(transfer);
};
