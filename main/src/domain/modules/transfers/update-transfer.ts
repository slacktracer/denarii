import { transfers } from "../../../persistence/persistence.js";
import { validateTransferRelatedEntities } from "./validate-transfer-related-entities.js";

export const updateTransfer = async ({ transferID, data, userID }) => {
  const { fromAccountID, toAccountID } = data;

  await validateTransferRelatedEntities({ fromAccountID, toAccountID, userID });

  data.updatedAt = new Date();
  data.updatedAtTimezone = data.atTimezone;

  return transfers.updateTransfer({
    transferID,
    data,
    userID,
  });
};
