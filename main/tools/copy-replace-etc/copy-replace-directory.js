export const copyReplaceDirectory = async ({
  getFileListFromDirectory,
  path,
  readReplaceWrite,
  replace,
  replaceBy,
  replaceMany,
}) => {
  const inputPaths = await getFileListFromDirectory({ directory: path });

  const outputPaths = inputPaths.map((text) =>
    replaceMany({ replace, replaceBy, text }),
  );

  return Promise.all(
    inputPaths.map((inputPath, index) =>
      readReplaceWrite({
        inputPath: inputPath,
        outputPath: outputPaths[index],
        replace,
        replaceBy,
        replaceMany,
      }),
    ),
  );
};
