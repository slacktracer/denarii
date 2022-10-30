import { transfers } from "../../../persistence/persistence.js";
import { print } from "../../objects/print.js";

const {
  createTransfer,
  deleteTransfer,
  readTransfer,
  readTransfers,
  updateTransfer,
} = transfers;

export const createCommands = ({ program }) => {
  const transfersCommand = program.command("transfers");

  transfersCommand
    .command("create")
    .requiredOption("-d, --data <data>")
    .requiredOption("--userID <id>")
    .action(async (options) => {
      const { userID } = options;

      const data = JSON.parse(options.data);

      const transfer = JSON.stringify(
        await createTransfer({ data, userID }),
        null,
        2,
      );

      print.info(transfer);
    });

  transfersCommand
    .command("delete")
    .requiredOption("--transferID <id>")
    .requiredOption("--userID <id>")
    .action(async (options) => {
      const { transferID, userID } = options;

      await deleteTransfer({ transferID, userID });

      print.info(`Transfer ${transferID} deleted.`);
    });

  transfersCommand
    .command("read")
    .option("--transferID <id>")
    .requiredOption("--userID <id>")
    .action(async (options) => {
      const { transferID, userID } = options;

      if (transferID) {
        const transfer = await readTransfer({ transferID, userID });

        print.info(transfer);

        return;
      }

      const transfers = await readTransfers({ userID });

      print.table(transfers);
    });

  transfersCommand
    .command("update")
    .requiredOption("-d, --data <data>")
    .requiredOption("--userID <id>")
    .action(async (options) => {
      const { transferID, userID } = options;

      const data = JSON.parse(options.data);

      const transfer = JSON.stringify(
        await updateTransfer({ transferID, data, userID }),
        null,
        2,
      );

      print.info(transfer);
    });

  return transfersCommand;
};
