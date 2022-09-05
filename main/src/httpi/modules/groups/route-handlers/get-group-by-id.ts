import { groups } from "../../../../domain/domain.js";

const { readGroup } = groups;

export const getGroupByID = async (request, response) => {
  const { userID } = request.session.user;

  const { groupID } = request.params;

  const group = await readGroup({ groupID, userID });

  response.json(group);
};
