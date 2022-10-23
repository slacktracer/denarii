import { tags } from "../../../../domain/domain.js";

const { createTagValue } = tags;

export const postTagValue = async (request, response) => {
  const { userID } = request.session.user;

  const { initialAmount, name } = request.body;

  const data = { initialAmount, name };

  const createdTagValue = await createTagValue({ data, userID });

  response.json(createdTagValue);
};
