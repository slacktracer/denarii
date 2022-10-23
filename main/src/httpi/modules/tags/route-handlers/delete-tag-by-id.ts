import {
  CustomError,
  NO_SUCH_TAG,
  tags,
  tryCatch,
  UNKNOWN_ERROR,
} from "../../../../domain/domain.js";

const { deleteTag } = tags;

export const deleteTagByID = async (request, response) => {
  const { userID } = request.session.user;

  const { tagID } = request.params;

  const result = await tryCatch(deleteTag, {
    tagID,
    userID,
  });

  if (result instanceof Error === false) {
    response.json(result);

    return;
  }

  if (result instanceof CustomError) {
    if (result.data.id === NO_SUCH_TAG) {
      response.status(404).end();

      return;
    }
  }

  console.warn(UNKNOWN_ERROR);
  console.error(result);

  response.status(500).end();
};
