import { transfers } from "../../../../domain/domain.js";
import { filterOutUndefinedEntries } from "../../../functions/filter-out-undefined-entries.js";

const { updateTransfer } = transfers;

export const patchTransfer = async (request, response) => {
  const { userID } = request.session.user;

  const { transferID } = request.params;

  const { amount, at, fromAccountID, toAccountID } = request.body;

  const data = { amount, at, fromAccountID, toAccountID };

  const updatedTransfer = await updateTransfer({
    transferID,
    data: filterOutUndefinedEntries({ object: data }),
    userID,
  });

  response.json(updatedTransfer);
};
