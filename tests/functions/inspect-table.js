import { convertObjectKeysFromCamelCaseToSnakeCase } from "denarii/src/persistence/functions/convert-object-keys-from-camel-case-to-snake-case.js";

import { pgm } from "../mocks/persistence/connect.js";

export const inspectTable = ({ table, template } = {}) => {
  const rows = [];

  for (const row of pgm.public
    .getTable(table)
    .find(convertObjectKeysFromCamelCaseToSnakeCase(template))) {
    rows.push(row);
  }

  return rows;
};
