import { groups } from "../../../persistence/persistence.js";
import { CustomError } from "../../custom-error.js";
import { NO_SUCH_GROUP } from "../../data/errors.js";

export const validateCategoryRelatedEntities = async ({ groupID, userID }) => {
  if (groupID) {
    const groupExists = await groups.doesGroupExists({
      groupID,
      userID,
    });

    if (groupExists === false) {
      throw new CustomError({ id: NO_SUCH_GROUP });
    }
  }
};
