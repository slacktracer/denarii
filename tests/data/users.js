import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

// export const makeUserData = () => {};

export const userID01 = uuid();
export const userID02 = uuid();
export const userID03 = uuid();

export const user01Password = "1234";

export const user01 = {
  createdAt: new Date().toISOString(),
  email: "mr.user@example.com",
  password: await bcrypt.hash(user01Password, 1),
  userID: userID01,
  username: "mr.user",
};

export const user02Password = "This is user 2 password";

export const user02 = {
  createdAt: new Date().toISOString(),
  email: "mr.user2@example.com",
  password: await bcrypt.hash(user02Password, 1),
  userID: userID02,
  username: "mr.user2",
};

export const user03Password = "correcthorsebatterystaple";

export const user03 = {
  createdAt: new Date().toISOString(),
  email: "mr.user3@example.com",
  password: await bcrypt.hash(user03Password, 1),
  userID: userID03,
  username: "mr.user3",
};
