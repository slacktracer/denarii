import { globby } from "globby";
import { promises as fs } from "node:fs";
import path from "node:path";

const queryFilesPaths = await globby(["./src/**/*.sql"]);

const promises = queryFilesPaths.map(async (queryFilesPath) => {
  const queryFilePathParts = queryFilesPath.split(path.sep);

  queryFilePathParts.splice(0, 2, "./", "build");

  await fs.copyFile(queryFilesPath, queryFilePathParts.join(path.sep));
});

Promise.all(promises).then(() => console.log("[COPY_QUERY_FILES] Done."));
