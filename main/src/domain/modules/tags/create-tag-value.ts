import { tags } from "../../../persistence/persistence.js";

export const createTagValue = ({ data, userID }) =>
  tags.createTagValue({
    data,
    userID,
  });
