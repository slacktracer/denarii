import { db } from "../../connect.js";

export const doesGroupExists = ({ groupID, userID }) =>
  db.group.exists({ groupID, userID });
