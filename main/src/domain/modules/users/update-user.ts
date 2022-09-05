import { users } from "../../../persistence/persistence.js";

export const updateUser = ({ data }) =>
  users.updateUser({
    data,
  });
