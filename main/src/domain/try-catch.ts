export const tryCatch = async (asyncFunction, ...parameters) => {
  try {
    const result = await asyncFunction(...parameters);

    return [result, null];
  } catch (error) {
    return [null, error];
  }
};
