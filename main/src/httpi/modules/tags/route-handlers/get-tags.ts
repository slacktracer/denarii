import { tags } from "../../../../domain/domain.js";

const { readTags } = tags;

export const getTags = async (request, response) => {
  const { userID } = request.session.user;

  const tags = await readTags({ userID });

  response.json(tags);
};
