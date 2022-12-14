import { v4 as uuid } from "uuid";

import { makeEnhancedArray } from "./make-enhanced-array.js";

export const makeTagData = ({ userID01, userID02 }) => {
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

  const tagKeys = makeEnhancedArray({
    tagKey01,
    tagKey02,
    tagKey03,
    tagKey04,
    tagKey05,
  });

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
  };
};
