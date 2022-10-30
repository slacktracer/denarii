import { balances } from "../../../persistence/persistence.js";
import { print } from "../../objects/print.js";

const { calculateBalances } = balances;

export const createCommands = ({ program }) => {
  const balancesCommand = program
    .command("balances")
    .requiredOption("--userID <id>")
    .action(async (options) => {
      const { userID } = options;

      const balances = await calculateBalances({ userID });

      print.table(balances);
    });

  return balancesCommand;
};
