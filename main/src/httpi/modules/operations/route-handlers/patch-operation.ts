import { operations } from "../../../../domain/domain.js";
import { filterOutUndefinedEntries } from "../../../functions/filter-out-undefined-entries.js";

const { updateOperation } = operations;

export const patchOperation = async (request, response) => {
  const { userID } = request.session.user;

  const { operationID } = request.params;

  const { accountID, amount, amountPerUnit, comments, type, unitCount } =
    request.body;

  const data = {
    accountID,
    amount,
    amountPerUnit,
    comments,
    type,
    unitCount,
  };

  const updatedOperation = await updateOperation({
    operationID,
    data: filterOutUndefinedEntries({ object: data }),
    userID,
  });

  response.json(updatedOperation);
};
