import { tags } from "../../../persistence/persistence.js";

export const createTagKey = ({ data, userID }) =>
  tags.createTagKey({
    data,
    userID,
  });
