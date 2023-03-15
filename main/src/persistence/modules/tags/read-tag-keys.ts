import { db } from "../../connect.js";

export const readTagKeys = async ({ userID }) => {
  const tagKeys = await db.tagKey.findMany({ where: { userID } });

  return tagKeys;
};
