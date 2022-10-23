import { tags } from "../../../persistence/persistence.js";

export const updateTagValue = ({ tagValueID, data, userID }) =>
  tags.updateTagValue({
    tagValueID,
    data,
    userID,
  });
