import { operations } from "../../../persistence/persistence.js";

export const readOperations = ({ userID }) =>
  operations.readOperations({ userID });
