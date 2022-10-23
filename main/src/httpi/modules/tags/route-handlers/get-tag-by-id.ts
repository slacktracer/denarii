import { tags } from "../../../../domain/domain.js";

const { readTag } = tags;

export const getTagByID = async (request, response) => {
  const { userID } = request.session.user;

  const { tagID } = request.params;

  const tag = await readTag({ tagID, userID });

  response.json(tag);
};
