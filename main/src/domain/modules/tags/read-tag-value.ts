import { tags } from "../../../persistence/persistence.js";

export const readTagValue = ({ tagValueID, userID }) =>
  tags.readTagValue({ tagValueID, userID });
