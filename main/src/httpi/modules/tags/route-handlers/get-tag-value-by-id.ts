import { tags } from "../../../../domain/domain.js";

const { readTagValue } = tags;

export const getTagValueByID = async (request, response) => {
  const { userID } = request.session.user;

  const { tagValueID } = request.params;

  const tagValue = await readTagValue({ tagValueID, userID });

  response.json(tagValue);
};
