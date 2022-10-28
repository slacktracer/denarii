import { tags } from "../../../../domain/domain.js";
import { filterOutUndefinedEntries } from "../../../functions/filter-out-undefined-entries.js";

const { updateTagValue } = tags;

export const patchTagValue = async (request, response) => {
  const { userID } = request.session.user;

  const { tagValueID } = request.params;

  const { name } = request.body;

  const data = { name };

  const updatedTagValue = await updateTagValue({
    tagValueID,
    data: filterOutUndefinedEntries({ object: data }),
    userID,
  });

  response.json(updatedTagValue);
};
