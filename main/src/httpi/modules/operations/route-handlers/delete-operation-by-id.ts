import {
  CustomError,
  NO_SUCH_OPERATION,
  operations,
  tryCatch,
  UNKNOWN_ERROR,
} from "../../../../domain/domain.js";
import { print } from "../../../objects/print.js";

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
      response.status(404).send({ message: NO_SUCH_OPERATION.description });

      return;
    }
  }

  print.warn(UNKNOWN_ERROR);
  print.error(result);

  response.status(500).end();
};
