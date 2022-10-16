import { v4 as uuid } from "uuid";

export const makeTagData = ({ operationID01, operationID03, userID01 }) => {
  const tagKey01 = {
    createdAt: new Date().toISOString(),
    name: "Group",
    tagKeyID: uuid(),
    userID: userID01,
  };

  const tagKey02 = {
    createdAt: new Date().toISOString(),
    name: "Category",
    tagKeyID: uuid(),
    userID: userID01,
  };

  const tagKey03 = {
    createdAt: new Date().toISOString(),
    name: "Location",
    tagKeyID: uuid(),
    userID: userID01,
  };

  const tagValue01 = {
    createdAt: new Date().toISOString(),
    name: "Some value 1",
    tagValueID: uuid(),
    userID: userID01,
  };

  const tagValue02 = {
    createdAt: new Date().toISOString(),
    name: "Some value 2",
    tagValueID: uuid(),
    userID: userID01,
  };

  const tagValue03 = {
    createdAt: new Date().toISOString(),
    name: "Some value 3",
    tagValueID: uuid(),
    userID: userID01,
  };

  const tagValue04 = {
    createdAt: new Date().toISOString(),
    name: "Some value 4",
    tagValueID: uuid(),
    userID: userID01,
  };

  const tagValue05 = {
    createdAt: new Date().toISOString(),
    name: "Some value 5",
    tagValueID: uuid(),
    userID: userID01,
  };

  const tag01 = {
    createdAt: new Date().toISOString(),
    tagID: uuid(),
    tagKeyID: tagKey01.tagKeyID,
    tagValueID: tagValue01.tagValueID,
    operationID: operationID01,
    userID: userID01,
  };
  const tag02 = {
    createdAt: new Date().toISOString(),
    tagID: uuid(),
    tagKeyID: tagKey02.tagKeyID,
    tagValueID: tagValue02.tagValueID,
    operationID: operationID01,
    userID: userID01,
  };
  const tag03 = {
    createdAt: new Date().toISOString(),
    tagID: uuid(),
    tagKeyID: tagKey01.tagKeyID,
    tagValueID: tagValue03.tagValueID,
    operationID: operationID03,
    userID: userID01,
  };
  const tag04 = {
    createdAt: new Date().toISOString(),
    tagID: uuid(),
    tagKeyID: tagKey02.tagKeyID,
    tagValueID: tagValue04.tagValueID,
    operationID: operationID03,
    userID: userID01,
  };

  const tag05 = {
    createdAt: new Date().toISOString(),
    tagID: uuid(),
    tagKeyID: tagKey02.tagKeyID,
    tagValueID: tagValue04.tagValueID,
    operationID: operationID03,
    userID: userID01,
  };

  const tags = [tag01, tag02, tag03, tag04, tag05];

  tags.$ = {
    tag01,
    tag02,
    tag03,
    tag04,
    tag05,
  };

  const tagKeys = [tagKey01, tagKey02, tagKey03];

  tagKeys.$ = { tagKey01, tagKey02, tagKey03 };

  const tagValues = [
    tagValue01,
    tagValue02,
    tagValue03,
    tagValue04,
    tagValue05,
  ];

  tagValues.$ = {
    tagValue01,
    tagValue02,
    tagValue03,
    tagValue04,
    tagValue05,
  };

  return {
    tagKeys,
    tagValues,
    tags,
  };
};
