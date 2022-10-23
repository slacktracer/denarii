import { tags } from "../../../../domain/domain.js";

const { readTagKeys } = tags;

export const getTagKeys = async (request, response) => {
  const { userID } = request.session.user;

  const tagKeys = await readTagKeys({ userID });

  response.json(tagKeys);
};
