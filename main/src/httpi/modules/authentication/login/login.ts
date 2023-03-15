import bcrypt from "bcrypt";

import { users } from "../../../../domain/domain.js";

export const login = async ({ password, username }) => {
  const user = await users.readUserByUsername({ password, username });

  if (user === null) {
    return false;
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  delete user.password;

  if (passwordMatches === false) {
    return false;
  }

  return user;
};
