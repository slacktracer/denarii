import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export const makeUserData = async () => {
  const user01Password = "1234";

  const user01 = {
    createdAt: new Date().toISOString(),
    email: "mr.user@example.com",
    password: await bcrypt.hash(user01Password, 1),
    userID: uuid(),
    username: "mr.user",
  };

  const user02Password = "This is user 2 password";

  const user02 = {
    createdAt: new Date().toISOString(),
    email: "mr.user2@example.com",
    password: await bcrypt.hash(user02Password, 1),
    userID: uuid(),
    username: "mr.user2",
  };

  const user03Password = "correcthorsebatterystaple";

  const user03 = {
    createdAt: new Date().toISOString(),
    email: "mr.user3@example.com",
    password: await bcrypt.hash(user03Password, 1),
    userID: uuid(),
    username: "mr.user3",
  };

  const users = [user01, user02, user03];

  users.$ = { user01, user02, user03 };

  const userPasswords = [user01Password, user02Password, user03Password];

  userPasswords.$ = { user01Password, user02Password, user03Password };

  return { users, userPasswords };
};
