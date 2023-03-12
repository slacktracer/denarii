import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import { makeEnhancedArray } from "./make-enhanced-array.js";

export const makeUserData = async () => {
  const user01Password = "1234";

  const user01 = {
    createdAt: new Date().toISOString(),
    deleted: false,
    email: "mr.user@example.com",
    password: await bcrypt.hash(user01Password, 1),
    userID: uuid(),
    username: "mr.user",
  };

  const user02Password = "This is user 2 password";

  const user02 = {
    createdAt: new Date().toISOString(),
    deleted: false,
    email: "mr.user2@example.com",
    password: await bcrypt.hash(user02Password, 1),
    userID: uuid(),
    username: "mr.user2",
  };

  const user03Password = "correcthorsebatterystaple";

  const user03 = {
    createdAt: new Date().toISOString(),
    deleted: false,
    email: "mr.user3@example.com",
    password: await bcrypt.hash(user03Password, 1),
    userID: uuid(),
    username: "mr.user3",
  };

  const users = makeEnhancedArray({ user01, user02, user03 });

  const userPasswords = makeEnhancedArray({
    user01Password,
    user02Password,
    user03Password,
  });

  return { users, userPasswords };
};
