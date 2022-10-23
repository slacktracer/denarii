import { tags } from "../../../persistence/persistence.js";

export const updateTag = ({ tagID, data, userID }) =>
  tags.updateTag({
    tagID,
    data,
    userID,
  });
