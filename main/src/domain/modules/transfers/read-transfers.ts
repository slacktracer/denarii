import { transfers } from "../../../persistence/persistence.js";

export const readTransfers = ({ userID }) =>
  transfers.readTransfers({ userID });
