import { users } from "../../../persistence/persistence.js";

export const createUser = ({ data }) =>
  users.createUser({
    data,
  });
