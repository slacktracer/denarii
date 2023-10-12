import { operations } from "../../../persistence/persistence.js";
import { isDateValid } from "../../functions/is-date-valid.js";

export const readOperations = ({ from, to, userID }) => {
  const datetimeRange = [
    isDateValid(from) ? new Date(from) : undefined,
    isDateValid(to) ? new Date(to) : undefined,
  ];

  return operations.readOperations({
    datetimeRange,
    userID,
  });
};
