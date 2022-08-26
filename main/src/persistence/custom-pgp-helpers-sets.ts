import initPGPromise from "pg-promise";
import { pipe } from "ramda";

import { convertObjectKeysFromCamelCaseToSnakeCase } from "./convert-object-keys-from-camel-case-to-snake-case.js";

const pgp = initPGPromise();

export const customPGPHelpersSets = pipe(
  convertObjectKeysFromCamelCaseToSnakeCase,
  pgp.helpers.sets,
);
