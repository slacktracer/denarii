import fs from "node:fs/promises";

export const getFileListFromDirectory = async ({ directory }) => {
  let fileList = [];
  const items = await fs.readdir(directory, { withFileTypes: true });

  for (const item of items) {
    if (item.isDirectory()) {
      fileList = [
        ...fileList,
        ...(await getFileListFromDirectory({
          directory: `${directory}/${item.name}`,
        })),
      ];
    } else {
      fileList.push(`${directory}/${item.name}`);
    }
  }

  return fileList;
};
