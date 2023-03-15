import bcrypt from "bcrypt";
import { randomUUID } from "crypto";

import { createUserParameter } from "../../../types.js";
import { db } from "../../connect.js";

export const createUser = async ({ data }: createUserParameter) => {
  const { email, password, username } = data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const createdUser = db.user.create({
    data: {
      createdAt: new Date(),
      email,
      password: hashedPassword,
      userID: randomUUID(),
      username,
    },
  });

  return createdUser;
};
