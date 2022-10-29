import { tags } from "../../../../domain/domain.js";

const { createTag } = tags;

export const postTag = async (request, response) => {
  const { userID } = request.session.user;

  const { operationID, tagKeyID, tagValueID } = request.body;

  const data = { operationID, tagKeyID, tagValueID };

  const createdTag = await createTag({ data, userID });

  response.json(createdTag);
};
