import { tags } from "../../../persistence/persistence.js";

export const readTag = ({ tagID, userID }) => tags.readTag({ tagID, userID });
