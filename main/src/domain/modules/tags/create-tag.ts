import { tags } from "../../../persistence/persistence.js";

export const createTag = ({ data, userID }) =>
  tags.createTag({
    data,
    userID,
  });
