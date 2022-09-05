import { groups } from "../../../../domain/domain.js";

const { updateGroup } = groups;

export const patchGroup = async (request, response) => {
  const { userID } = request.session.user;

  const { groupID } = request.params;

  const { initialAmount, name } = request.body;

  const data = { initialAmount, name };

  const updatedGroup = await updateGroup({ groupID, data, userID });

  response.json(updatedGroup);
};
