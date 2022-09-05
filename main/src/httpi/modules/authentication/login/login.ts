import bcrypt from "bcrypt";

import { users } from "../../../../domain/domain.js";

export const login = async ({ password, username }) => {
  const user = await users.readUserByUsername({ password, username });

  const passwordMatches = await bcrypt.compare(password, user.password);

  delete user.password;

  if (passwordMatches === false) {
    return false;
  }

  return user;
};
