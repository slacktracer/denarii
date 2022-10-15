import bcrypt from "bcrypt";
import { convertObjectKeysFromCamelCaseToSnakeCase } from "denarii/src/persistence/functions/convert-object-keys-from-camel-case-to-snake-case.js";
import squel from "squel";
import { v4 as uuid } from "uuid";

export const accountID01 = uuid();
export const accountID02 = uuid();
export const accountID03 = uuid();
export const accountID04 = uuid();
export const accountID05 = uuid();
export const accountID06 = uuid();
export const operationID01 = uuid();
export const operationID02 = uuid();
export const operationID03 = uuid();
export const operationID04 = uuid();
export const transferID01 = uuid();
export const transferID02 = uuid();
export const transferID03 = uuid();
export const transferID04 = uuid();
export const userID01 = uuid();
export const userID02 = uuid();
export const userID03 = uuid();

export const account01 = {
  accountID: accountID01,
  createdAt: new Date().toISOString(),
  initialAmount: 0,
  name: "Account 1!",
  userID: userID01,
};

export const account02 = {
  accountID: accountID02,
  createdAt: new Date().toISOString(),
  initialAmount: 0,
  name: "Account 2!",
  userID: userID01,
};

export const account03 = {
  accountID: accountID03,
  createdAt: new Date().toISOString(),
  initialAmount: 0,
  name: "Account 3!",
  userID: userID01,
};

export const account04 = {
  accountID: accountID04,
  createdAt: new Date().toISOString(),
  initialAmount: 0,
  name: "Account 4!",
  userID: userID01,
};

export const account05 = {
  accountID: accountID05,
  createdAt: new Date().toISOString(),
  initialAmount: 0,
  name: "Account 5!",
  userID: userID01,
};

export const account06 = {
  accountID: accountID06,
  createdAt: new Date().toISOString(),
  initialAmount: 0,
  name: "Account 6!",
  userID: userID02,
};

export const accounts = [
  account01,
  account02,
  account03,
  account04,
  account05,
  account06,
];

export const operation01 = {
  accountID: accountID01,
  amount: 100_00,
  amountPerUnit: 100_00,
  at: new Date().toISOString(),
  comments: "This is operation 1.",
  createdAt: new Date().toISOString(),
  operationID: operationID01,
  type: "Income",
  unitCount: 1,
  userID: userID01,
};

export const operation02 = {
  accountID: accountID01,
  amount: 100_00,
  amountPerUnit: 100_00,
  at: new Date().toISOString(),
  comments: "This is operation 2.",
  createdAt: new Date().toISOString(),
  operationID: operationID02,
  type: "Income",
  unitCount: 1,
  userID: userID01,
};

export const operation03 = {
  accountID: accountID01,
  amount: 100_00,
  amountPerUnit: 100_00,
  at: new Date().toISOString(),
  comments: "This is operation 3.",
  createdAt: new Date().toISOString(),
  operationID: operationID03,
  type: "Income",
  unitCount: 1,
  userID: userID01,
};

export const operation04 = {
  accountID: accountID01,
  amount: 100_00,
  amountPerUnit: 100_00,
  at: new Date().toISOString(),
  comments: "This is operation 4.",
  createdAt: new Date().toISOString(),
  operationID: operationID04,
  type: "Income",
  unitCount: 1,
  userID: userID01,
};

export const operation05 = {
  accountID: accountID01,
  amount: 100_00,
  amountPerUnit: 100_00,
  at: new Date().toISOString(),
  comments: "This is operation 4.",
  createdAt: new Date().toISOString(),
  operationID: operationID04,
  type: "Income",
  unitCount: 1,
  userID: userID02,
};

export const operations = [operation01, operation02, operation03, operation04];

export const transfer01 = {
  amount: 10_000_00,
  at: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  fromAccountID: accountID01,
  toAccountID: accountID02,
  transferID: transferID01,
  userID: userID01,
};

export const transfer02 = {
  amount: 10_000_00,
  at: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  fromAccountID: accountID01,
  toAccountID: accountID02,
  transferID: transferID02,
  userID: userID01,
};

export const transfer03 = {
  amount: 10_000_00,
  at: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  fromAccountID: accountID01,
  toAccountID: accountID02,
  transferID: transferID03,
  userID: userID01,
};

export const transfer04 = {
  amount: 10_000_00,
  at: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  fromAccountID: accountID01,
  toAccountID: accountID02,
  transferID: transferID04,
  userID: userID01,
};

export const transfers = [transfer01, transfer02, transfer03, transfer04];

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

export const users = [user01, user02, user03];

const insertAccountsQuery = squel
  .insert()
  .into("public.account")
  .setFieldsRows(accounts.map(convertObjectKeysFromCamelCaseToSnakeCase));

const insertOperationsQuery = squel
  .insert()
  .into("public.operation")
  .setFieldsRows(operations.map(convertObjectKeysFromCamelCaseToSnakeCase));

const insertTransfersQuery = squel
  .insert()
  .into("public.transfer")
  .setFieldsRows(transfers.map(convertObjectKeysFromCamelCaseToSnakeCase));

const insertUsersQuery = squel
  .insert()
  .into("public.user")
  .setFieldsRows(users.map(convertObjectKeysFromCamelCaseToSnakeCase));

export const mockDataAsInsertStatements = `${insertUsersQuery};

${insertAccountsQuery};

${insertTransfersQuery};

${insertOperationsQuery};`;
