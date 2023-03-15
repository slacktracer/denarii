import { db } from "../../connect.js";

export const readTagValues = async ({ userID }) => {
  const tagValues = await db.tagValue.findMany({ where: { userID } });

  return tagValues;
};
