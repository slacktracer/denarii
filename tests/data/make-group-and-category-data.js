import { getFixedUUID } from "./get-fixed-uuid.js";
import { makeEnhancedArray } from "./make-enhanced-array.js";

export const makeGroupAndCategoryData = ({ userID01, userID02 }) => {
  const group01 = {
    createdAt: new Date().toISOString(),
    deleted: false,
    name: "Group 1",
    groupID: getFixedUUID(),
    updatedAt: null,
    userID: userID01,
  };

  const group02 = {
    createdAt: new Date().toISOString(),
    deleted: false,
    name: "Group 2",
    groupID: getFixedUUID(),
    updatedAt: null,
    userID: userID01,
  };

  const group03 = {
    createdAt: new Date().toISOString(),
    deleted: false,
    name: "Group 3",
    groupID: getFixedUUID(),
    updatedAt: null,
    userID: userID02,
  };

  const category01 = {
    categoryID: getFixedUUID(),
    createdAt: new Date().toISOString(),
    deleted: false,
    groupID: group01.groupID,
    name: "Category 1",
    updatedAt: null,
    userID: userID01,
  };

  const category02 = {
    categoryID: getFixedUUID(),
    createdAt: new Date().toISOString(),
    deleted: false,
    groupID: group01.groupID,
    name: "Category 2",
    updatedAt: null,
    userID: userID01,
  };

  const category03 = {
    categoryID: getFixedUUID(),
    createdAt: new Date().toISOString(),
    deleted: false,
    groupID: group02.groupID,
    name: "Category 3",
    updatedAt: null,
    userID: userID01,
  };

  const category04 = {
    categoryID: getFixedUUID(),
    createdAt: new Date().toISOString(),
    deleted: false,
    groupID: group02.groupID,
    name: "Category 4",
    updatedAt: null,
    userID: userID01,
  };

  const category05 = {
    categoryID: getFixedUUID(),
    createdAt: new Date().toISOString(),
    deleted: false,
    groupID: group03.groupID,
    name: "Category 5",
    updatedAt: null,
    userID: userID02,
  };

  const category06 = {
    categoryID: getFixedUUID(),
    createdAt: new Date().toISOString(),
    deleted: false,
    groupID: group03.groupID,
    name: "Category 6",
    updatedAt: null,
    userID: userID02,
  };

  const groups = makeEnhancedArray({
    group01,
    group02,
    group03,
  });

  const categories = makeEnhancedArray({
    category01,
    category02,
    category03,
    category04,
    category05,
    category06,
  });

  return {
    categories,
    groups,
  };
};
