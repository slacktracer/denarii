import fs from "node:fs/promises";

export const isPathToFile = async ({ path }) =>
  (await fs.lstat(path)).isDirectory() === false;
