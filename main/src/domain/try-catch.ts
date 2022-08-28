export const tryCatch = async (asyncFunction, ...parameters) => {
  try {
    const result = await asyncFunction(...parameters);

    return result;
  } catch (error) {
    if (error instanceof Error) {
      return error;
    }

    return new Error(error);
  }
};
