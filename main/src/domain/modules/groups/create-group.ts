import { groups } from "../../../persistence/persistence.js";

export const createGroup = ({ data, userID }) =>
  groups.createGroup({
    data,
    userID,
  });
