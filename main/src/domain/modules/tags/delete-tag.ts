import { tags } from "../../../persistence/persistence.js";
import { CustomError } from "../../custom-error.js";
import { NO_SUCH_TAG } from "../../data/errors.js";

export const deleteTag = async ({ tagID, userID }) => {
  const tag = await tags.readTag({ tagID, userID });

  const noSuchTag = tag ?? true;

  if (noSuchTag === true) {
    throw new CustomError({ id: NO_SUCH_TAG });
  }

  if (tag) {
    const { deletedRowsCount } = await tags.deleteTag({
      tagID,
      userID,
    });

    return { deletedRowsCount };
  }
};
