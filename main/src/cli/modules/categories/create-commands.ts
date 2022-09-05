import { categories } from "../../../persistence/persistence.js";

const {
  createCategory,
  deleteCategory,
  readCategories,
  readCategory,
  updateCategory,
} = categories;

export const createCommands = ({ program }) => {
  const categoriesCommand = program.command("categories");

  categoriesCommand
    .command("create")
    .requiredOption("-d, --data <data>")
    .requiredOption("--userID <id>")
    .action(async (options) => {
      const { userID } = options;

      const data = JSON.parse(options.data);

      const group = JSON.stringify(
        await createCategory({ data, userID }),
        null,
        2,
      );

      console.log(group);
    });

  categoriesCommand
    .command("delete")
    .requiredOption("--categoryID <id>")
    .requiredOption("--userID <id>")
    .action(async (options) => {
      const { categoryID, userID } = options;

      await deleteCategory({ categoryID, userID });

      console.log(`Category ${categoryID} deleted.`);
    });

  categoriesCommand
    .command("read")
    .option("--categoryID <id>")
    .requiredOption("--userID <id>")
    .action(async (options) => {
      const { categoryID, userID } = options;

      if (categoryID) {
        const group = await readCategory({ categoryID, userID });

        console.log(group);

        return;
      }

      const groups = await readCategories({ userID });

      console.table(groups);
    });

  categoriesCommand
    .command("update")
    .requiredOption("-d, --data <data>")
    .requiredOption("--userID <id>")
    .action(async (options) => {
      const { categoryID, userID } = options;

      const data = JSON.parse(options.data);

      const group = JSON.stringify(
        await updateCategory({ categoryID, data, userID }),
        null,
        2,
      );

      console.log(group);
    });

  return categoriesCommand;
};
