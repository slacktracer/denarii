import { users } from "../../../../domain/domain.js";

const { readUsers } = users;

export const getUsers = async (request, response) => {
  const users = await readUsers();

  response.json(users);
};
