import { tags } from "../../../persistence/persistence.js";

export const readTagKeys = ({ userID }) => tags.readTagKeys({ userID });
