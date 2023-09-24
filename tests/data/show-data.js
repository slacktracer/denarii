import {
  accounts,
  categories,
  groups,
  operations,
  transfers,
  users,
} from "./data.js";

delete users.$;

console.table(users);

delete accounts.$;

console.table(accounts);

delete categories.$;

console.table(categories);

delete groups.$;

console.table(groups);

delete operations.$;

console.table(operations);

delete transfers.$;

console.table(transfers);
