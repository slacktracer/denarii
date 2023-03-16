export const filterOutUndefinedEntries = ({ object }) => {
  const filteredEntries = Object.entries(object).filter(
    ([, value]) => value !== undefined,
  );

  return Object.fromEntries(filteredEntries);
};
