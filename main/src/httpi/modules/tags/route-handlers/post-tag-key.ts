import { tags } from "../../../../domain/domain.js";

const { createTagKey } = tags;

export const postTagKey = async (request, response) => {
  const { userID } = request.session.user;

  const { initialAmount, name } = request.body;

  const data = { initialAmount, name };

  const createdTagKey = await createTagKey({ data, userID });

  response.json(createdTagKey);
};
