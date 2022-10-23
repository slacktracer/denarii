import { convertObjectKeysFromCamelCaseToSnakeCase } from "denarii/src/persistence/functions/convert-object-keys-from-camel-case-to-snake-case.js";
import squel from "squel";

import { makeAccountData } from "./make-account-data.js";
import { makeOperationData } from "./make-operation-data.js";
import { makeTagData } from "./make-tag-data.js";
import { makeTransferData } from "./make-transfer-data.js";
import { makeUserData } from "./make-user-data.js";

export const { users, userPasswords } = await makeUserData();

const {
  user01: { userID: userID01 },
  user02: { userID: userID02 },
} = users.$;

export const { accounts } = makeAccountData({
  userID01,
  userID02,
});

const {
  account01: { accountID: accountID01 },
  account02: { accountID: accountID02 },
} = accounts.$;

export const { operations } = makeOperationData({
  accountID01,
  userID01,
  userID02,
});

const {
  operation01: { operationID: operationID01 },
  operation03: { operationID: operationID03 },
} = operations.$;

export const { tags, tagKeys, tagValues } = makeTagData({
  operationID01,
  operationID03,
  userID01,
  userID02,
});

export const { transfers } = makeTransferData({
  accountID01,
  accountID02,
  userID01,
});

export const insertUsersQuery = squel
  .insert()
  .into("public.user")
  .setFieldsRows(users.map(convertObjectKeysFromCamelCaseToSnakeCase));

const insertAccountsQuery = squel
  .insert()
  .into("public.account")
  .setFieldsRows(accounts.map(convertObjectKeysFromCamelCaseToSnakeCase));

const insertOperationsQuery = squel
  .insert()
  .into("public.operation")
  .setFieldsRows(operations.map(convertObjectKeysFromCamelCaseToSnakeCase));

const insertTagsQuery = squel
  .insert()
  .into("public.tag")
  .setFieldsRows(tags.map(convertObjectKeysFromCamelCaseToSnakeCase));

const insertTagKeysQuery = squel
  .insert()
  .into("public.tag_key")
  .setFieldsRows(tagKeys.map(convertObjectKeysFromCamelCaseToSnakeCase));

const insertTagValuesQuery = squel
  .insert()
  .into("public.tag_value")
  .setFieldsRows(tagValues.map(convertObjectKeysFromCamelCaseToSnakeCase));

const insertTransfersQuery = squel
  .insert()
  .into("public.transfer")
  .setFieldsRows(transfers.map(convertObjectKeysFromCamelCaseToSnakeCase));

export const mockDataAsInsertStatements = `${insertUsersQuery};

${insertAccountsQuery};

${insertTransfersQuery};

${insertOperationsQuery};

${insertTagKeysQuery};

${insertTagValuesQuery};

${insertTagsQuery};`;
