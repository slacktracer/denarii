import { tags } from "../../../../domain/domain.js";

const { readTagKey } = tags;

export const getTagKeyByID = async (request, response) => {
  const { userID } = request.session.user;

  const { tagKeyID } = request.params;

  const tagKey = await readTagKey({ tagKeyID, userID });

  response.json(tagKey);
};
