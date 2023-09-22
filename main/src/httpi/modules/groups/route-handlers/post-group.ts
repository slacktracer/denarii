import { groups } from "../../../../domain/domain.js";

const { createGroup } = groups;

export const postGroup = async (request, response) => {
  const { userID } = request.session.user;

  const { name } = request.body;

  const data = { name };

  const createdGroup = await createGroup({ data, userID });

  response.json(createdGroup);
};
