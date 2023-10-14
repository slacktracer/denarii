import {
  accounts,
  categories,
  groups,
  operations,
  transfers,
  users,
} from "./data.js";

const shorten = (string) => string.substring(0, 7);

users.forEach((user) => {
  user.password = "<hidden>";
  user.userID = `${shorten(user.userID)}...`;
});

[accounts, categories, groups, operations, transfers].forEach((collection) => {
  collection.forEach((object) => {
    let accountID;

    if (object.accountID && object.operationID) {
      accountID = object.accountID;
    }

    let groupID;

    if (object.categoryID && object.groupID) {
      groupID = object.groupID;
    }

    let categoryID;

    if (object.categoryID && object.operationID) {
      categoryID = object.categoryID;
    }

    let fromAccountID;
    let toAccountID;

    if (object.fromAccountID && object.toAccountID) {
      fromAccountID = object.fromAccountID;
      toAccountID = object.toAccountID;
    }

    const { userID } = object;

    Object.keys(object).forEach((key) => {
      if (key.endsWith("ID")) {
        object[key] = `${shorten(object[key])}...`;
      }
    });

    object.userID += ` [${users.byID[userID].username}]`;

    if (object.accountID && object.operationID) {
      object.accountID += ` [${accounts.byID[accountID].name}]`;
      object.tags = "<hidden>";
    }

    if (object.categoryID && object.groupID) {
      object.groupID += ` [${groups.byID[groupID].name}]`;
    }

    if (object.categoryID && object.operationID) {
      object.categoryID += ` [${categories.byID[categoryID].name}]`;
    }

    if (object.fromAccountID && object.toAccountID) {
      object.fromAccountID += ` [${accounts.byID[fromAccountID].name}]`;
      object.toAccountID += ` [${accounts.byID[toAccountID].name}]`;
    }
  });
});

[accounts, categories, groups, operations, transfers, users].forEach(
  (object) => {
    delete object.$;
    delete object.byBindingName;
    delete object.byID;
  },
);

console.info("Users");
console.table(users);
console.info("");

console.info("Accounts");
console.table(accounts);
console.info("");

console.info("Categories");
console.table(categories);
console.info("");

console.info("Groups");
console.table(groups);
console.info("");

console.info("Operations");
console.table(operations);
console.info("");

console.info("Transfers");
console.table(transfers);
console.info("");
