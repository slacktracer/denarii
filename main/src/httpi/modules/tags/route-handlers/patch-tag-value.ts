import { tags } from "../../../../domain/domain.js";

const { updateTagValue } = tags;

export const patchTagValue = async (request, response) => {
  const { userID } = request.session.user;

  const { tagValueID } = request.params;

  const { name } = request.body;

  const data = { name };

  const updatedTagValue = await updateTagValue({ tagValueID, data, userID });

  response.json(updatedTagValue);
};
