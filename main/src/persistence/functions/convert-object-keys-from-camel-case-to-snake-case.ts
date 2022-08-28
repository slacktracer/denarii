export const convertObjectKeysFromCamelCaseToSnakeCase = (object) => {
  const o = { ...object };

  const keys = Object.keys(o);

  const camelCaseKeys = keys.filter((key) => /[a-z][A-Z]/.test(key));

  camelCaseKeys.forEach((key) => {
    const snakeCaseKey = key.replace(
      /[a-z][A-Z]/g,
      (match) => `${match[0]}_${match[1]}`,
    );

    o[snakeCaseKey.toLowerCase()] = o[key];

    delete o[key];
  });

  return o;
};
