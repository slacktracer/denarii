import { v4 as uuid } from "uuid";

export const makeTagData = ({ operationID01, operationID03, userID01 }) => {
  const tagID01 = uuid();
  const tagID02 = uuid();
  const tagID03 = uuid();
  const tagID04 = uuid();
  const tagID05 = uuid();
  const tagKeyID01 = uuid();
  const tagKeyID02 = uuid();
  const tagKeyID03 = uuid();
  const tagValueID01 = uuid();
  const tagValueID02 = uuid();
  const tagValueID03 = uuid();
  const tagValueID04 = uuid();
  const tagValueID05 = uuid();

  const tag01 = {
    createdAt: new Date().toISOString(),
    tagID: tagID01,
    tagKeyID: tagKeyID01,
    tagValueID: tagValueID01,
    operationID: operationID01,
    userID: userID01,
  };
  const tag02 = {
    createdAt: new Date().toISOString(),
    tagID: tagID02,
    tagKeyID: tagKeyID02,
    tagValueID: tagValueID02,
    operationID: operationID01,
    userID: userID01,
  };
  const tag03 = {
    createdAt: new Date().toISOString(),
    tagID: tagID03,
    tagKeyID: tagKeyID01,
    tagValueID: tagValueID03,
    operationID: operationID03,
    userID: userID01,
  };
  const tag04 = {
    createdAt: new Date().toISOString(),
    tagID: tagID04,
    tagKeyID: tagKeyID02,
    tagValueID: tagValueID04,
    operationID: operationID03,
    userID: userID01,
  };

  const tag05 = {
    createdAt: new Date().toISOString(),
    tagID: tagID05,
    tagKeyID: tagKeyID02,
    tagValueID: tagValueID04,
    operationID: operationID03,
    userID: userID01,
  };

  const tagKey01 = {
    createdAt: new Date().toISOString(),
    name: "Group",
    tagKeyID: tagKeyID01,
    userID: userID01,
  };

  const tagKey02 = {
    createdAt: new Date().toISOString(),
    name: "Category",
    tagKeyID: tagKeyID02,
    userID: userID01,
  };

  const tagKey03 = {
    createdAt: new Date().toISOString(),
    name: "Location",
    tagKeyID: tagKeyID03,
    userID: userID01,
  };

  const tagValue01 = {
    createdAt: new Date().toISOString(),
    name: "Some value 1",
    tagValueID: tagValueID01,
    userID: userID01,
  };

  const tagValue02 = {
    createdAt: new Date().toISOString(),
    name: "Some value 2",
    tagValueID: tagValueID02,
    userID: userID01,
  };

  const tagValue03 = {
    createdAt: new Date().toISOString(),
    name: "Some value 3",
    tagValueID: tagValueID03,
    userID: userID01,
  };

  const tagValue04 = {
    createdAt: new Date().toISOString(),
    name: "Some value 4",
    tagValueID: tagValueID04,
    userID: userID01,
  };

  const tagValue05 = {
    createdAt: new Date().toISOString(),
    name: "Some value 5",
    tagValueID: tagValueID05,
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
