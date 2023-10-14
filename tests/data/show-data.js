import {
  accounts,
  categories,
  groups,
  operations,
  transfers,
  users,
} from "./data.js";

const shorten = (string) => string.substring(0, 7);

const [
  unfrozenAccounts,
  unfrozenCategories,
  unfrozenGroups,
  unfrozenOperations,
  unfrozenTransfers,
  unfrozenUsers,
] = [
  accounts.map((user) => Object.assign({}, user)),
  categories.map((user) => Object.assign({}, user)),
  groups.map((user) => Object.assign({}, user)),
  operations.map((user) => Object.assign({}, user)),
  transfers.map((user) => Object.assign({}, user)),
  users.map((user) => Object.assign({}, user)),
];

unfrozenAccounts.byBindingName = accounts.byBindingName;
unfrozenAccounts.byID = accounts.byID;
unfrozenCategories.byBindingName = categories.byBindingName;
unfrozenCategories.byID = categories.byID;
unfrozenGroups.byBindingName = groups.byBindingName;
unfrozenGroups.byID = groups.byID;
unfrozenOperations.byBindingName = operations.byBindingName;
unfrozenOperations.byID = operations.byID;
unfrozenTransfers.byBindingName = transfers.byBindingName;
unfrozenTransfers.byID = transfers.byID;
unfrozenUsers.byBindingName = users.byBindingName;
unfrozenUsers.byID = users.byID;

unfrozenUsers.forEach((user) => {
  user.password = "<hidden>";
  user.userID = `${shorten(user.userID)}...`;
});

[
  unfrozenAccounts,
  unfrozenCategories,
  unfrozenGroups,
  unfrozenOperations,
  unfrozenTransfers,
].forEach((collection) => {
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

    object.userID += ` [${unfrozenUsers.byID[userID].username}]`;

    if (object.accountID && object.operationID) {
      object.accountID += ` [${unfrozenAccounts.byID[accountID].name}]`;
      object.tags = "<hidden>";
    }

    if (object.categoryID && object.groupID) {
      object.groupID += ` [${unfrozenGroups.byID[groupID].name}]`;
    }

    if (object.categoryID && object.operationID) {
      object.categoryID += ` [${unfrozenCategories.byID[categoryID].name}]`;
    }

    if (object.fromAccountID && object.toAccountID) {
      object.fromAccountID += ` [${unfrozenAccounts.byID[fromAccountID].name}]`;
      object.toAccountID += ` [${unfrozenAccounts.byID[toAccountID].name}]`;
    }
  });
});

[
  unfrozenAccounts,
  unfrozenCategories,
  unfrozenGroups,
  unfrozenOperations,
  unfrozenTransfers,
  unfrozenUsers,
].forEach((object) => {
  delete object.$;
  delete object.byBindingName;
  delete object.byID;
});

console.info("Users");
console.table(unfrozenUsers);
console.info("");

console.info("Accounts");
console.table(unfrozenAccounts);
console.info("");

console.info("Categories");
console.table(unfrozenCategories);
console.info("");

console.info("Groups");
console.table(unfrozenGroups);
console.info("");

console.info("Operations");
console.table(unfrozenOperations);
console.info("");

console.info("Transfers");
console.table(unfrozenTransfers);
console.info("");
