import {
  CustomError,
  NO_SUCH_TAG_KEY,
  tags,
  tryCatch,
  UNKNOWN_ERROR,
} from "../../../../domain/domain.js";

const { deleteTagKey } = tags;

export const deleteTagKeyByID = async (request, response) => {
  const { userID } = request.session.user;

  const { tagKeyID } = request.params;

  const result = await tryCatch(deleteTagKey, {
    tagKeyID,
    userID,
  });

  if (result instanceof Error === false) {
    response.json(result);

    return;
  }

  if (result instanceof CustomError) {
    if (result.data.id === NO_SUCH_TAG_KEY) {
      response.status(404).end();

      return;
    }
  }

  console.warn(UNKNOWN_ERROR);
  console.error(result);

  response.status(500).end();
};
