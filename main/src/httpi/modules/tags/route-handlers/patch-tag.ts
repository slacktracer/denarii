import { tags } from "../../../../domain/domain.js";
import { filterOutUndefinedEntries } from "../../../functions/filter-out-undefined-entries.js";

const { updateTag } = tags;

export const patchTag = async (request, response) => {
  const { userID } = request.session.user;

  const { tagID } = request.params;

  const { operationID, tagKeyID, tagValueID } = request.body;

  const data = { operationID, tagKeyID, tagValueID };

  const updatedTag = await updateTag({
    tagID,
    data: filterOutUndefinedEntries({ object: data }),
    userID,
  });

  response.json(updatedTag);
};
