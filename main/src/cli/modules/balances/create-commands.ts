import { calculateBalances } from "../../../core/modules/balances/core/calculate-balances.js";

export const createCommands = ({ program }) => {
  const balancesCommand = program
    .command("balances")
    .requiredOption("--userID <id>")
    .action(async (options) => {
      const { userID } = options;

      const balances = await calculateBalances({ userID });

      console.table(balances);
    });

  return balancesCommand;
};
