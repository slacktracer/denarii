import { users } from "../../../persistence/persistence.js";
import { CustomError } from "../../custom-error.js";
import { NO_SUCH_ACCOUNT } from "../../data/errors.js";

export const deleteUser = async ({ userID }) => {
  const user = await users.readUser({ userID });

  const noSuchUser = user ?? true;

  if (noSuchUser === true) {
    throw new CustomError({ id: NO_SUCH_ACCOUNT });
  }

  if (user) {
    const { deletedRowsCount } = await users.deleteUser({
      userID,
    });

    return { deletedRowsCount };
  }
};
