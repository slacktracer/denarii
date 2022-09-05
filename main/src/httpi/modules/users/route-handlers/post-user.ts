import { users } from "../../../../domain/domain.js";

const { createUser } = users;

export const postUser = async (request, response) => {
  const { email, password, username } = request.body;

  const data = { email, password, username };

  const createdUser = await createUser({ data });

  response.json(createdUser);
};
