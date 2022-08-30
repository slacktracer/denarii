export const customColumnNamesTransformations = {};

export const setCustomColumnNamesTransformations = (keyValuePairs) =>
  keyValuePairs.forEach(
    ([key, value]) => (customColumnNamesTransformations[key] = value),
  );
