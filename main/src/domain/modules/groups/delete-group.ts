import { groups } from "../../../persistence/persistence.js";
import { CustomError } from "../../custom-error.js";
import { NO_SUCH_GROUP } from "../../data/errors.js";

export const deleteGroup = async ({ groupID, userID }) => {
  const group = await groups.readGroup({ groupID, userID });

  const noSuchGroup = group ?? true;

  if (noSuchGroup === true) {
    throw new CustomError({ id: NO_SUCH_GROUP });
  }

  if (group) {
    const { deletedRowsCount } = await groups.deleteGroup({
      groupID,
      userID,
    });

    return { deletedRowsCount };
  }
};
