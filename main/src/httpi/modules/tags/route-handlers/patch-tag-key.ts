import { tags } from "../../../../domain/domain.js";

const { updateTagKey } = tags;

export const patchTagKey = async (request, response) => {
  const { userID } = request.session.user;

  const { tagKeyID } = request.params;

  const { name } = request.body;

  const data = { name };

  const updatedTagKey = await updateTagKey({ tagKeyID, data, userID });

  response.json(updatedTagKey);
};
