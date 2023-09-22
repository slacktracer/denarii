import { db } from "../../connect.js";

export const readGroups = async ({ userID }) => {
  const groups = await db.group.findMany({ where: { userID } });

  return groups;
};
