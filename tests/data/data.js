import { convertObjectKeysFromCamelCaseToSnakeCase } from "denarii/src/persistence/functions/convert-object-keys-from-camel-case-to-snake-case.js";
import squel from "squel";

import { handleJSONColumns } from "../functions/handle-json-columns.js";
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

export const { tagKeys, tagValues } = makeTagData({
  userID01,
  userID02,
});

const {
  account01: { accountID: accountID01 },
  account02: { accountID: accountID02 },
} = accounts.$;

const {
  tagKey01: { tagKeyID: tagKeyID01 },
  tagKey02: { tagKeyID: tagKeyID02 },
  tagKey03: { tagKeyID: tagKeyID03 },
  tagKey04: { tagKeyID: tagKeyID04 },
} = tagKeys.$;

const {
  tagValue01: { tagValueID: tagValueID01 },
  tagValue02: { tagValueID: tagValueID02 },
  tagValue03: { tagValueID: tagValueID03 },
  tagValue04: { tagValueID: tagValueID04 },
} = tagValues.$;

export const { operations } = makeOperationData({
  accountID01,
  tagKeyID01,
  tagKeyID02,
  tagKeyID03,
  tagKeyID04,
  tagValueID01,
  tagValueID02,
  tagValueID03,
  tagValueID04,
  userID01,
  userID02,
});

export const { transfers } = makeTransferData({
  accountID01,
  accountID02,
  userID01,
  userID02,
});

export const insertUsersQuery = squel
  .insert()
  .into("public.user")
  .setFieldsRows(users.map(convertObjectKeysFromCamelCaseToSnakeCase))
  .toString();

const insertAccountsQuery = squel
  .insert()
  .into("public.account")
  .setFieldsRows(accounts.map(convertObjectKeysFromCamelCaseToSnakeCase))
  .toString();

const insertOperationsQuery = squel
  .insert()
  .into("public.operation")
  .setFieldsRows(
    operations
      .map(convertObjectKeysFromCamelCaseToSnakeCase)
      .map(handleJSONColumns),
  )
  .toString();

const insertTagKeysQuery = squel
  .insert()
  .into("public.tag_key")
  .setFieldsRows(tagKeys.map(convertObjectKeysFromCamelCaseToSnakeCase))
  .toString();

const insertTagValuesQuery = squel
  .insert()
  .into("public.tag_value")
  .setFieldsRows(tagValues.map(convertObjectKeysFromCamelCaseToSnakeCase))
  .toString();

const insertTransfersQuery = squel
  .insert()
  .into("public.transfer")
  .setFieldsRows(transfers.map(convertObjectKeysFromCamelCaseToSnakeCase))
  .toString();

export const mockDataAsInsertStatements = [
  insertUsersQuery,
  insertAccountsQuery,
  insertTransfersQuery,
  insertOperationsQuery,
  insertTagKeysQuery,
  insertTagValuesQuery,
];
