import { tags } from "../../../../domain/domain.js";
import { filterOutUndefinedEntries } from "../../../functions/filter-out-undefined-entries.js";

const { updateTagKey } = tags;

export const patchTagKey = async (request, response) => {
  const { userID } = request.session.user;

  const { tagKeyID } = request.params;

  const { name } = request.body;

  const data = { name };

  const updatedTagKey = await updateTagKey({
    tagKeyID,
    data: filterOutUndefinedEntries({ object: data }),
    userID,
  });

  response.json(updatedTagKey);
};
