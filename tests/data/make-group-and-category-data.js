import { v4 as uuid } from "uuid";

import { makeEnhancedArray } from "./make-enhanced-array.js";

export const makeGroupAndCategoryData = ({ userID01, userID02 }) => {
  const group01 = {
    createdAt: new Date().toISOString(),
    deleted: false,
    name: "Group 1",
    groupID: uuid(),
    updatedAt: null,
    userID: userID01,
  };

  const group02 = {
    createdAt: new Date().toISOString(),
    deleted: false,
    name: "Group 2",
    groupID: uuid(),
    updatedAt: null,
    userID: userID01,
  };

  const group03 = {
    createdAt: new Date().toISOString(),
    deleted: false,
    name: "Group 3",
    groupID: uuid(),
    updatedAt: null,
    userID: userID02,
  };

  const category01 = {
    categoryID: uuid(),
    createdAt: new Date().toISOString(),
    deleted: false,
    groupID: group01.groupID,
    name: "Category 1",
    updatedAt: null,
    userID: userID01,
  };

  const category02 = {
    categoryID: uuid(),
    createdAt: new Date().toISOString(),
    deleted: false,
    groupID: group01.groupID,
    name: "Category 2",
    updatedAt: null,
    userID: userID01,
  };

  const category03 = {
    categoryID: uuid(),
    createdAt: new Date().toISOString(),
    deleted: false,
    groupID: group02.groupID,
    name: "Category 3",
    updatedAt: null,
    userID: userID01,
  };

  const category04 = {
    categoryID: uuid(),
    createdAt: new Date().toISOString(),
    deleted: false,
    groupID: group02.groupID,
    name: "Category 4",
    updatedAt: null,
    userID: userID01,
  };

  const category05 = {
    categoryID: uuid(),
    createdAt: new Date().toISOString(),
    deleted: false,
    groupID: group03.groupID,
    name: "Category 5",
    updatedAt: null,
    userID: userID02,
  };

  const category06 = {
    categoryID: uuid(),
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
