import { users } from "../../../../domain/domain.js";

const { updateUser } = users;

export const patchUser = async (request, response) => {
  const { email, password, username } = request.body;

  const data = { email, password, username };

  const updatedUser = await updateUser({ data });

  response.json(updatedUser);
};
