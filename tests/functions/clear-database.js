import { db } from "../mocks/persistence/connect.js";

export const clearDatabase = () =>
  db.$transaction([
    db.tagValue.deleteMany(),
    db.tagKey.deleteMany(),
    db.operation.deleteMany(),
    db.transfer.deleteMany(),
    db.account.deleteMany(),
    db.user.deleteMany(),
  ]);
