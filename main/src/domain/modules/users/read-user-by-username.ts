import { users } from "../../../persistence/persistence.js";

export const readUserByUsername = ({ username }) =>
  users.readUserByUsername({ username });
