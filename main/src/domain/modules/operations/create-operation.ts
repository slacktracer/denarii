import { operations } from "../../../persistence/persistence.js";

export const createOperation = ({ data, userID }) =>
  operations.createOperation({
    data,
    userID,
  });
