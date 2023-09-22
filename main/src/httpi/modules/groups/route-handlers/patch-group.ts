import { groups } from "../../../../domain/domain.js";
import { filterOutUndefinedEntries } from "../../../functions/filter-out-undefined-entries.js";

const { updateGroup } = groups;

export const patchGroup = async (request, response) => {
  const { userID } = request.session.user;

  const { groupID } = request.params;

  const { name } = request.body;

  const data = { name };

  const updatedGroup = await updateGroup({
    groupID,
    data: filterOutUndefinedEntries({ object: data }),
    userID,
  });

  response.json(updatedGroup);
};
