import { tags } from "../../../persistence/persistence.js";

export const readTagKey = ({ tagKeyID, userID }) =>
  tags.readTagKey({ tagKeyID, userID });
