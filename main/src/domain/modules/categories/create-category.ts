import { categories, groups } from "../../../persistence/persistence.js";
import { CustomError } from "../../custom-error.js";
import { NO_SUCH_GROUP } from "../../data/errors.js";

export const createCategory = async ({ data, userID }) => {
  const group = await groups.readGroup({ groupID: data.groupID, userID });

  const noSuchGroup = group ?? true;

  if (noSuchGroup === true) {
    throw new CustomError({ id: NO_SUCH_GROUP });
  }

  return categories.createCategory({
    data,
    userID,
  });
};
