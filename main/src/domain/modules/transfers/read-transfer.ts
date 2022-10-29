import { transfers } from "../../../persistence/persistence.js";

export const readTransfer = ({ transferID, userID }) =>
  transfers.readTransfer({ transferID, userID });
