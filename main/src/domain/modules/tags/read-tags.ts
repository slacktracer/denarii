import { tags } from "../../../persistence/persistence.js";

export const readTags = ({ userID }) => tags.readTags({ userID });
