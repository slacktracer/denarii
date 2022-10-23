import { tags } from "../../../../domain/domain.js";

const { readTagValues } = tags;

export const getTagValues = async (request, response) => {
  const { userID } = request.session.user;

  const tagValues = await readTagValues({ userID });

  response.json(tagValues);
};
