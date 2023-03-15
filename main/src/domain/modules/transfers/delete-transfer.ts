import { transfers } from "../../../persistence/persistence.js";
import { CustomError } from "../../custom-error.js";
import { NO_SUCH_TRANSFER } from "../../data/errors.js";

export const deleteTransfer = async ({ transferID, userID }) => {
  const transfer = await transfers.readTransfer({ transferID, userID });

  const noSuchTransfer = transfer ?? true;

  if (noSuchTransfer === true) {
    throw new CustomError({ id: NO_SUCH_TRANSFER });
  }

  if (transfer) {
    const { deletedTransfer } = await transfers.deleteTransfer({
      transferID,
      userID,
    });

    return { deletedTransfer };
  }
};
