import { v4 as uuid } from "uuid";

import { makeEnhancedArray } from "./make-enhanced-array.js";

export const makeTagData = ({
  operationID01,
  operationID03,
  userID01,
  userID02,
}) => {
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

  const tagKey04 = {
    createdAt: new Date().toISOString(),
    name: "Location",
    tagKeyID: uuid(),
    userID: userID02,
  };

  const tagKey05 = {
    createdAt: new Date().toISOString(),
    name: "Location",
    tagKeyID: uuid(),
    userID: userID02,
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

  const tagValue06 = {
    createdAt: new Date().toISOString(),
    name: "Some value 5",
    tagValueID: uuid(),
    userID: userID02,
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

  const tag06 = {
    createdAt: new Date().toISOString(),
    tagID: uuid(),
    tagKeyID: tagKey02.tagKeyID,
    tagValueID: tagValue04.tagValueID,
    operationID: operationID03,
    userID: userID02,
  };

  const tagKeys = makeEnhancedArray({
    tagKey01,
    tagKey02,
    tagKey03,
    tagKey04,
    tagKey05,
  });

  const tags = makeEnhancedArray({ tag01, tag02, tag03, tag04, tag05, tag06 });

  const tagValues = makeEnhancedArray({
    tagValue01,
    tagValue02,
    tagValue03,
    tagValue04,
    tagValue05,
    tagValue06,
  });

  return {
    tagKeys,
    tagValues,
    tags,
  };
};
