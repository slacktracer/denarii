import { tags } from "../../../persistence/persistence.js";
import { CustomError } from "../../custom-error.js";
import { NO_SUCH_TAG_VALUE } from "../../data/errors.js";

export const deleteTagValue = async ({ tagValueID, userID }) => {
  const tagValue = await tags.readTagValue({ tagValueID, userID });

  const noSuchTagValue = tagValue ?? true;

  if (noSuchTagValue === true) {
    throw new CustomError({ id: NO_SUCH_TAG_VALUE });
  }

  if (tagValue) {
    const { deletedRowsCount } = await tags.deleteTagValue({
      tagValueID,
      userID,
    });

    return { deletedRowsCount };
  }
};
