import { convertObjectKeysFromCamelCaseToSnakeCase } from "denarii/src/persistence/convert-object-keys-from-camel-case-to-snake-case.js";

import { pgm } from "../mocks/persistence.js";

export const inspectTable = ({ table, template } = {}) => {
  const rows = [];

  for (const row of pgm.public
    .getTable(table)
    .find(convertObjectKeysFromCamelCaseToSnakeCase(template))) {
    rows.push(row);
  }

  return rows;
};
