import { groups } from "../../../persistence/persistence.js";

export const updateGroup = ({ groupID, data, userID }) =>
  groups.updateGroup({
    groupID,
    data,
    userID,
  });
