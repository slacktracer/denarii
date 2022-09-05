import { users } from "../../../persistence/persistence.js";

export const readUser = ({ userID }) => users.readUser({ userID });
