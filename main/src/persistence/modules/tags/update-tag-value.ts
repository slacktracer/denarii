import { db } from "../../connect.js";

export const updateTagValue = async ({ tagValueID, data, userID }) => {
  const { ...update } = data;

  const updatedTagValue = await db.tagValue.update({
    data: { ...update },
    where: { tagValueID, userID },
  });

  return updatedTagValue;
};
