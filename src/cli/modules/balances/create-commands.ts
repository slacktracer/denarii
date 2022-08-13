import { calculateBalances } from "../../../core/modules/balances/core/calculate-balances.js";

export const createCommands = ({ program }) => {
  const balancesCommand = program.command("balances").action(async () => {
    const balances = await calculateBalances();

    console.table(balances);
  });

  return balancesCommand;
};
