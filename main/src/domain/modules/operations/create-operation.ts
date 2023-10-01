import { operations } from "../../../persistence/persistence.js";
import { validateOperationRelatedEntities } from "./validate-operation-related-entities.js";

export const createOperation = async ({ data, userID }) => {
  const { accountID, categoryID } = data;

  await validateOperationRelatedEntities({ accountID, categoryID, userID });

  return operations.createOperation({
    data,
    userID,
  });
};
