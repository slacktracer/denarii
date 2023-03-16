import {
  CustomError,
  NO_SUCH_TAG_VALUE,
  tags,
  tryCatch,
  UNKNOWN_ERROR,
} from "../../../../domain/domain.js";
import { print } from "../../../objects/print.js";

const { deleteTagValue } = tags;

export const deleteTagValueByID = async (request, response) => {
  const { userID } = request.session.user;

  const { tagValueID } = request.params;

  const result = await tryCatch(deleteTagValue, {
    tagValueID,
    userID,
  });

  if (result instanceof Error === false) {
    response.json(result);

    return;
  }

  if (result instanceof CustomError) {
    if (result.data.id === NO_SUCH_TAG_VALUE) {
      response.status(404).send({ message: NO_SUCH_TAG_VALUE.description });

      return;
    }
  }

  print.warn(UNKNOWN_ERROR);
  print.error(result);

  response.status(500).end();
};
