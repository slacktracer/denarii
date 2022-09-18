import fs from "fs-extra";

export const readReplaceWrite = async ({
  inputPath,
  outputPath,
  replace,
  replaceBy,
  replaceMany,
}) => {
  const text = await fs.readFile(inputPath, "utf8");

  const replacedText = replaceMany({ replace, replaceBy, text });

  return fs.outputFile(outputPath, replacedText);
};
