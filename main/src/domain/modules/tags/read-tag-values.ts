import { tags } from "../../../persistence/persistence.js";

export const readTagValues = ({ userID }) => tags.readTagValues({ userID });
