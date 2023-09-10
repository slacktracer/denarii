export type createAccountParameter = {
  data: { initialAmount: number; name: string };
  userID: string;
};

export type createOperationParameter = {
  data: {
    accountID: string;
    amount: number;
    amountPerUnit: number;
    at: Date;
    categoryID: string;
    comments: string;
    operationID: string;
    type: string;
    unitCount: number;
  };
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

export type createUserParameter = {
  data: {
    email: string;
    password: string;
    username: string;
  };
};
