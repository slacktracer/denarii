import { transfers } from "../../../persistence/persistence.js";

export const updateTransfer = ({ transferID, data, userID }) =>
  transfers.updateTransfer({
    transferID,
    data,
    userID,
  });
