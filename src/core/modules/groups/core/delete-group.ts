import { db, loadQuery } from "../../../../persistence/persistence.js";

const deleteGroupQuery = loadQuery({
  base: import.meta.url,
  url: "./delete-group.sql",
});

export const deleteGroup = ({ groupID, userID }) =>
  db.none(deleteGroupQuery, { groupID, userID });
