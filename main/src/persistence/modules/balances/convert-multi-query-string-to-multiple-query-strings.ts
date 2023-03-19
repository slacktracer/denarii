export const convertMultiQueryStringToMultipleQueryStrings = (
  multiQueryString,
) =>
  multiQueryString
    .split("\n")
    .filter((line) => line.indexOf("--") !== 0)
    .join("\n")
    .replace(/(\r\n|\n|\r)/gm, " ")
    .replace(/\s+/g, " ")
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean);
