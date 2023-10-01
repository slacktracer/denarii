import { transfers } from "../../../persistence/persistence.js";
import { validateRelatedEntities } from "./validate-related-entities.js";

export const updateTransfer = async ({ transferID, data, userID }) => {
  const { fromAccountID, toAccountID } = data;

  await validateRelatedEntities({ fromAccountID, toAccountID, userID });

  return transfers.updateTransfer({
    transferID,
    data,
    userID,
  });
};
