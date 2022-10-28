import { tags } from "../../../../domain/domain.js";

const { createTagValue } = tags;

export const postTagValue = async (request, response) => {
  const { userID } = request.session.user;

  const { name } = request.body;

  const data = { name };

  const createdTagValue = await createTagValue({ data, userID });

  response.json(createdTagValue);
};
