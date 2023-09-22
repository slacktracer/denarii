import { groups } from "../../../persistence/persistence.js";

export const readGroups = ({ userID }) => groups.readGroups({ userID });
