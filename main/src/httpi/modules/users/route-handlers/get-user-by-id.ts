import { users } from "../../../../domain/domain.js";

const { readUser } = users;

export const getUserByID = async (request, response) => {
  const { userID } = request.params;

  const user = await readUser({ userID });

  response.json(user);
};
