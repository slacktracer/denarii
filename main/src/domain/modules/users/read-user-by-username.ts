import { users } from "../../../persistence/persistence.js";

export const readUserByUsername = ({ password, username }) =>
  users.readUserByUsername({ password, username });
