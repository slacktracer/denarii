import {
  CustomError,
  NO_SUCH_TRANSFER,
  transfers,
  tryCatch,
  UNKNOWN_ERROR,
} from "../../../../domain/domain.js";
import { print } from "../../../objects/print.js";

const { deleteTransfer } = transfers;

export const deleteTransferByID = async (request, response) => {
  const { userID } = request.session.user;

  const { transferID } = request.params;

  const result = await tryCatch(deleteTransfer, {
    transferID,
    userID,
  });

  if (result instanceof Error === false) {
    response.json(result);

    return;
  }

  if (result instanceof CustomError) {
    if (result.data.id === NO_SUCH_TRANSFER) {
      response.status(404).send({ message: NO_SUCH_TRANSFER.description });

      return;
    }
  }

  print.warn(UNKNOWN_ERROR);
  print.error(result);

  response.status(500).end();
};
