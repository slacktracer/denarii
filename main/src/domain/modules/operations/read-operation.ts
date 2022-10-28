import { operations } from "../../../persistence/persistence.js";

export const readOperation = ({ operationID, userID }) =>
  operations.readOperation({ operationID, userID });
