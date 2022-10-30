export const handleJSONColumns = (object) =>
  Object.fromEntries(
    Object.entries(object).map(([key, value]) => {
      if (typeof value === "object") {
        return [key, JSON.stringify(value)];
      }

      return [key, value];
    }),
  );
