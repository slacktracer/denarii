import {
  CustomError,
  NO_SUCH_OPERATION,
  operations,
  tryCatch,
  UNKNOWN_ERROR,
} from "../../../../domain/domain.js";

const { deleteOperation } = operations;

export const deleteOperationByID = async (request, response) => {
  const { userID } = request.session.user;

  const { operationID } = request.params;

  const result = await tryCatch(deleteOperation, {
    operationID,
    userID,
  });

  if (result instanceof Error === false) {
    response.json(result);

    return;
  }

  if (result instanceof CustomError) {
    if (result.data.id === NO_SUCH_OPERATION) {
      response.status(404).end();

      return;
    }
  }

  console.warn(UNKNOWN_ERROR);
  console.error(result);

  response.status(500).end();
};
