import { path, replace, replaceBy } from "./configuration.js";
import { copyReplaceDirectory } from "./copy-replace-directory.js";
import { copyReplaceFile } from "./copy-replace-file.js";
import { getFileListFromDirectory } from "./get-file-list-from-directory.js";
import { isPathToFile } from "./is-path-to-file.js";
import { readReplaceWrite } from "./read-replace-write.js";
import { replaceMany } from "./replace-many.js";

const pathIsToFile = await isPathToFile({ path });

const result =
  pathIsToFile === true
    ? await copyReplaceFile({
        path,
        readReplaceWrite,
        replace,
        replaceBy,
        replaceMany,
      })
    : await copyReplaceDirectory({
        getFileListFromDirectory,
        path,
        readReplaceWrite,
        replace,
        replaceBy,
        replaceMany,
      });

console.log(result);
