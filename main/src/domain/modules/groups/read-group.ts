import { groups } from "../../../persistence/persistence.js";

export const readGroup = ({ groupID, userID }) =>
  groups.readGroup({ groupID, userID });
