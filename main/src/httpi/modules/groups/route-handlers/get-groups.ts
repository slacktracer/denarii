import { groups } from "../../../../domain/domain.js";

const { readGroups } = groups;

export const getGroups = async (request, response) => {
  const { userID } = request.session.user;

  const groups = await readGroups({ userID });

  response.json(groups);
};
