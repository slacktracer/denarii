import { tags } from "../../../persistence/persistence.js";

export const updateTagKey = ({ tagKeyID, data, userID }) =>
  tags.updateTagKey({
    tagKeyID,
    data,
    userID,
  });
