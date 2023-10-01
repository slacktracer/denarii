import { transfers } from "../../../persistence/persistence.js";
import { validateTransferRelatedEntities } from "./validate-transfer-related-entities.js";

export const createTransfer = async ({ data, userID }) => {
  const { fromAccountID, toAccountID } = data;

  await validateTransferRelatedEntities({ fromAccountID, toAccountID, userID });

  return transfers.createTransfer({
    data,
    userID,
  });
};
