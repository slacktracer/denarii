import { getFixedUUID } from "./get-fixed-uuid.js";
import { makeEnhancedArray } from "./make-enhanced-array.js";

export const makeTagData = ({ userID01, userID02 }) => {
  const tagKey01 = {
    createdAt: new Date().toISOString(),
    deleted: false,
    name: "Group",
    tagKeyID: getFixedUUID(),
    updatedAt: null,
    userID: userID01,
  };

  const tagKey02 = {
    createdAt: new Date().toISOString(),
    deleted: false,
    name: "Category",
    tagKeyID: getFixedUUID(),
    updatedAt: null,
    userID: userID01,
  };

  const tagKey03 = {
    createdAt: new Date().toISOString(),
    deleted: false,
    name: "Location",
    tagKeyID: getFixedUUID(),
    updatedAt: null,
    userID: userID01,
  };

  const tagKey04 = {
    createdAt: new Date().toISOString(),
    deleted: false,
    name: "Location",
    tagKeyID: getFixedUUID(),
    updatedAt: null,
    userID: userID02,
  };

  const tagKey05 = {
    createdAt: new Date().toISOString(),
    deleted: false,
    name: "Location",
    tagKeyID: getFixedUUID(),
    updatedAt: null,
    userID: userID02,
  };

  const tagValue01 = {
    createdAt: new Date().toISOString(),
    deleted: false,
    name: "Some value 1",
    tagValueID: getFixedUUID(),
    updatedAt: null,
    userID: userID01,
  };

  const tagValue02 = {
    createdAt: new Date().toISOString(),
    deleted: false,
    name: "Some value 2",
    tagValueID: getFixedUUID(),
    updatedAt: null,
    userID: userID01,
  };

  const tagValue03 = {
    createdAt: new Date().toISOString(),
    deleted: false,
    name: "Some value 3",
    tagValueID: getFixedUUID(),
    updatedAt: null,
    userID: userID01,
  };

  const tagValue04 = {
    createdAt: new Date().toISOString(),
    deleted: false,
    name: "Some value 4",
    tagValueID: getFixedUUID(),
    updatedAt: null,
    userID: userID01,
  };

  const tagValue05 = {
    createdAt: new Date().toISOString(),
    deleted: false,
    name: "Some value 5",
    tagValueID: getFixedUUID(),
    updatedAt: null,
    userID: userID01,
  };

  const tagValue06 = {
    createdAt: new Date().toISOString(),
    deleted: false,
    name: "Some value 5",
    tagValueID: getFixedUUID(),
    updatedAt: null,
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
