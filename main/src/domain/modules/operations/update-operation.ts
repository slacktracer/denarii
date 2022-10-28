import { operations } from "../../../persistence/persistence.js";

export const updateOperation = ({ operationID, data, userID }) =>
  operations.updateOperation({
    operationID,
    data,
    userID,
  });
