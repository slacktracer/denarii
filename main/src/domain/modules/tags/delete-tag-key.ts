import { tags } from "../../../persistence/persistence.js";
import { CustomError } from "../../custom-error.js";
import { NO_SUCH_TAG_KEY } from "../../data/errors.js";

export const deleteTagKey = async ({ tagKeyID, userID }) => {
  const tagKey = await tags.readTagKey({ tagKeyID, userID });

  const noSuchTagKey = tagKey ?? true;

  if (noSuchTagKey === true) {
    throw new CustomError({ id: NO_SUCH_TAG_KEY });
  }

  if (tagKey) {
    const { deletedRowsCount } = await tags.deleteTagKey({
      tagKeyID,
      userID,
    });

    return { deletedRowsCount };
  }
};
