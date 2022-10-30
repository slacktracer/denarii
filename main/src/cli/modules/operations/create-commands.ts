import { operations } from "../../../persistence/persistence.js";
import { print } from "../../objects/print.js";

const {
  createOperation,
  deleteOperation,
  readOperation,
  readOperations,
  updateOperation,
} = operations;

export const createCommands = ({ program }) => {
  const operationsCommand = program.command("operations");

  operationsCommand
    .command("create")
    .requiredOption("-d, --data <data>")
    .requiredOption("--userID <id>")
    .action(async (options) => {
      const { userID } = options;

      const data = JSON.parse(options.data);

      const operation = JSON.stringify(
        await createOperation({ data, userID }),
        null,
        2,
      );

      print.info(operation);
    });

  operationsCommand
    .command("delete")
    .requiredOption("--userID <id>")
    .action(async (options) => {
      const { operationID, userID } = options;

      await deleteOperation({ operationID, userID });

      print.info(`User ${userID} deleted.`);
    });

  operationsCommand
    .command("read")
    .option("--id <id>")
    .requiredOption("--userID <id>")
    .action(async (options) => {
      const { operationID, userID } = options;

      if (operationID) {
        const operation = await readOperation({ operationID, userID });

        print.info(operation);

        return;
      }

      const operations = await readOperations({ userID });

      print.table(operations);
    });

  operationsCommand
    .command("update")
    .requiredOption("-d, --data <data>")
    .requiredOption("--userID <id>")
    .action(async (options) => {
      const { operationID, userID } = options;

      const data = JSON.parse(options.data);

      const operation = JSON.stringify(
        await updateOperation({ operationID, data, userID }),
        null,
        2,
      );

      print.info(operation);
    });

  return operationsCommand;
};
