export const copyReplaceFile = ({
  path,
  readReplaceWrite,
  replace,
  replaceBy,
  replaceMany,
}) => {
  const outputPath = replaceMany({ replace, replaceBy, text: path });

  return readReplaceWrite({
    inputPath: path,
    outputPath,
    replace,
    replaceBy,
    replaceMany,
  });
};
