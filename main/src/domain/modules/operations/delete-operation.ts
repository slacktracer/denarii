import { operations } from "../../../persistence/persistence.js";
import { CustomError } from "../../custom-error.js";
import { NO_SUCH_OPERATION } from "../../data/errors.js";

export const deleteOperation = async ({ operationID, userID }) => {
  const operation = await operations.readOperation({ operationID, userID });

  const noSuchOperation = operation ?? true;

  if (noSuchOperation === true) {
    throw new CustomError({ id: NO_SUCH_OPERATION });
  }

  if (operation) {
    const { deletedRowsCount } = await operations.deleteOperation({
      operationID,
      userID,
    });

    return { deletedRowsCount };
  }
};
