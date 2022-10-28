import { operations } from "../../../../domain/domain.js";

const { readOperations } = operations;

export const getOperations = async (request, response) => {
  const { userID } = request.session.user;

  const operations = await readOperations({ userID });

  response.json(operations);
};
