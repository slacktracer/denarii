import {
  CustomError,
  NO_SUCH_USER,
  tryCatch,
  UNKNOWN_ERROR,
  users,
} from "../../../../domain/domain.js";

const { deleteUser } = users;

export const deleteUserByID = async (request, response) => {
  const { userID } = request.params;

  const result = await tryCatch(deleteUser, {
    userID,
  });

  if (result instanceof Error === false) {
    response.json(result);

    return;
  }

  if (result instanceof CustomError) {
    if (result.data.id === NO_SUCH_USER) {
      response.status(404).end();

      return;
    }
  }

  console.warn(UNKNOWN_ERROR);
  console.error(result);

  response.status(500).end();
};
