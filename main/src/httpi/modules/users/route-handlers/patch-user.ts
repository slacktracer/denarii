import { users } from "../../../../domain/domain.js";
import { filterOutUndefinedEntries } from "../../../functions/filter-out-undefined-entries.js";

const { updateUser } = users;

export const patchUser = async (request, response) => {
  const { email, password, username } = request.body;

  const data = { email, password, username };

  const updatedUser = await updateUser({
    data: filterOutUndefinedEntries({ object: data }),
  });

  response.json(updatedUser);
};
