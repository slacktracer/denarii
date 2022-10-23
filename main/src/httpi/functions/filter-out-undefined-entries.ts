export const filterOutUndefinedEntries = ({ object }) => {
  const filteredEntries = Object.entries(object).filter(
    ([key, value]) => value !== undefined,
  );

  return Object.fromEntries(filteredEntries);
};
