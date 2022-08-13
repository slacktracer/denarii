import initPGPromise from "pg-promise";

import { customColumnNamesTransformations } from "./set-custom-column-names-transformations.js";

export const transformColumnNames = (data) => {
  const tmp = data[0];

  for (const prop in tmp) {
    const camel =
      customColumnNamesTransformations[prop] ??
      initPGPromise.utils.camelize(prop);

    if (!(camel in tmp)) {
      for (let i = 0; i < data.length; i++) {
        const d = data[i];

        d[camel] = d[prop];

        delete d[prop];
      }
    }
  }
};
