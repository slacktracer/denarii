import { operations } from "../../../../domain/domain.js";

const { readOperation } = operations;

export const getOperationByID = async (request, response) => {
  const { userID } = request.session.user;

  const { operationID } = request.params;

  const operation = await readOperation({ operationID, userID });

  response.json(operation);
};
