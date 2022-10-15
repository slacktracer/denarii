export type createAccountParameter = {
  data: { initialAmount: number; name: number };
  userID: string;
};

export type createTagParameter = {
  data: { operationID: string; tagKeyID: string; tagValueID: string };
  userID: string;
};

export type createTagKeyParameter = {
  data: { name: string };
  userID: string;
};

export type createTagValueParameter = {
  data: { name: string };
  userID: string;
};
