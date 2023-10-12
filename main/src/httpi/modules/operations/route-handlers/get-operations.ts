import { operations } from "../../../../domain/domain.js";

const { readOperations } = operations;

export const getOperations = async (request, response) => {
  const { from, to } = request.query;

  const { userID } = request.session.user;

  const operations = await readOperations({
    from,
    to,
    userID,
  });

  response.json(operations);
};
