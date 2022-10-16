import { convertObjectKeysFromCamelCaseToSnakeCase } from "denarii/src/persistence/functions/convert-object-keys-from-camel-case-to-snake-case.js";
import squel from "squel";

import { makeAccountData } from "./make-account-data.js";
import { makeOperationData } from "./make-operation-data.js";
import { makeTagData } from "./make-tag-data.js";
import { makeTransferData } from "./make-transfer-data.js";
import { makeUserData } from "./make-user-data.js";

export const {
  user01,
  user01Password,
  user02,
  user03,
  userID01,
  userID02,
  userID03,
} = await makeUserData();

export const users = [user01, user02, user03];

export const {
  account01,
  account02,
  account03,
  account04,
  account05,
  account06,
  accountID01,
  accountID02,
  accountID03,
  accountID04,
  accountID05,
  accountID06,
} = makeAccountData({
  userID01,
  userID02,
});

export const accounts = [
  account01,
  account02,
  account03,
  account04,
  account05,
  account06,
];

export const {
  operation01,
  operation02,
  operation03,
  operation04,
  operationID01,
  operationID02,
  operationID03,
} = makeOperationData({ accountID01, userID01, userID02 });

export const operations = [operation01, operation02, operation03, operation04];

export const {
  tag01,
  tag02,
  tag03,
  tag04,
  tag05,
  tagID01,
  tagID05,
  tagKey01,
  tagKey02,
  tagKey03,
  tagKeyID01,
  tagKeyID02,
  tagKeyID03,
  tagValue01,
  tagValue02,
  tagValue03,
  tagValue04,
  tagValue05,
  tagValueID01,
  tagValueID02,
  tagValueID05,
} = makeTagData({ operationID01, operationID03, userID01 });

export const tags = [tag01, tag02, tag03, tag04, tag05];
export const tagKeys = [tagKey01, tagKey02, tagKey03];
export const tagValues = [
  tagValue01,
  tagValue02,
  tagValue03,
  tagValue04,
  tagValue05,
];

export const {
  transfer01,
  transfer02,
  transfer03,
  transfer04,
  transferID01,
  transferID04,
} = makeTransferData({ accountID01, accountID02, userID01 });

export const transfers = [transfer01, transfer02, transfer03, transfer04];

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
