import { createTransfer } from "../../../core/modules/transfers/core/create-transfer/create-transfer.js";
import { readTransfers } from "../../../core/modules/transfers/core/read-transfers/read-transfers.js";

export const createCommands = ({ program }) => {
  const transfersCommand = program.command("transfers");

  transfersCommand
    .command("create")
    .requiredOption("-d, --data <data>")
    .action(async (options) => {
      const data = JSON.parse(options.data);

      const transfer = JSON.stringify(await createTransfer({ data }), null, 2);

      console.log(transfer);
    });

  transfersCommand.command("read").action(async () => {
    const transfers = await readTransfers();

    console.table(transfers);
  });

  return transfersCommand;
};
