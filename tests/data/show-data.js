import {
  accounts,
  categories,
  groups,
  operations,
  transfers,
  users,
} from "./data.js";

delete users.$;

console.info("Users");
console.table(users);

delete accounts.$;

console.info("Accounts");
console.table(accounts);

delete categories.$;

console.info("Categories");
console.table(categories);

delete groups.$;

console.info("Groups");
console.table(groups);

delete operations.$;

console.info("Operations");
console.table(operations);

delete transfers.$;

console.info("Transfers");
console.table(transfers);
