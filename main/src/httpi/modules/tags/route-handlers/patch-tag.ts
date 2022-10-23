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
    // this "data transformation" is probably going to be necessary in every
    // PATCH. The lack of it is just not causing other issues right now because
    // the other tests and entities being patched are too simple/small...
    data: filterOutUndefinedEntries({ object: data }),
    userID,
  });

  response.json(updatedTag);
};
