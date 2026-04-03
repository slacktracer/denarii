import { transfers } from "../../../persistence/persistence.js";
import { isDateValid } from "../../functions/is-date-valid.js";

export const readTransfers = ({ from, to, userID }) => {
  const datetimeRange = [
    isDateValid(from) ? new Date(from) : undefined,
    isDateValid(to) ? new Date(to) : undefined,
  ];

  return transfers.readTransfers({
    datetimeRange,
    userID,
  });
};
