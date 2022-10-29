import { transfers } from "../../../persistence/persistence.js";

export const createTransfer = ({ data, userID }) =>
  transfers.createTransfer({
    data,
    userID,
  });
