import { transfers } from "../../../persistence/persistence.js";
import { validateRelatedEntities } from "./validate-related-entities.js";

export const createTransfer = async ({ data, userID }) => {
  const { fromAccountID, toAccountID } = data;

  await validateRelatedEntities({ fromAccountID, toAccountID, userID });

  return transfers.createTransfer({
    data,
    userID,
  });
};
