import {
  CustomError,
  NO_SUCH_TAG_VALUE,
  tags,
  tryCatch,
  UNKNOWN_ERROR,
} from "../../../../domain/domain.js";

const { deleteTagValue } = tags;

export const deleteTagValueByID = async (request, response) => {
  const { userID } = request.session.user;

  const { tagValueID } = request.params;

  const result = await tryCatch(deleteTagValue, {
    tagValueID,
    userID,
  });

  if (result instanceof Error === false) {
    response.json(result);

    return;
  }

  if (result instanceof CustomError) {
    if (result.data.id === NO_SUCH_TAG_VALUE) {
      response.status(404).end();

      return;
    }
  }

  console.warn(UNKNOWN_ERROR);
  console.error(result);

  response.status(500).end();
};
