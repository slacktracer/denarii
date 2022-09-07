import {
  CustomError,
  groups,
  NO_SUCH_GROUP,
  tryCatch,
  UNKNOWN_ERROR,
} from "../../../../domain/domain.js";

const { deleteGroup } = groups;

export const deleteGroupByID = async (request, response) => {
  const { userID } = request.session.user;

  const { groupID } = request.params;

  const result = await tryCatch(deleteGroup, {
    groupID,
    userID,
  });

  if (result instanceof Error === false) {
    response.json(result);

    return;
  }

  if (result instanceof CustomError) {
    if (result.data.id === NO_SUCH_GROUP) {
      response.status(404).end();

      return;
    }
  }

  console.warn(UNKNOWN_ERROR);
  console.error(result);

  response.status(500).end();
};
